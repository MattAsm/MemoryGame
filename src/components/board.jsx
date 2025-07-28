import Card from './card.jsx';
import React, { useRef, useState, useEffect } from 'react';
import './board.css';

function Board(){

    const [cardArr, setCardArr] = useState([]);
    const [firstPick, setFirstPick] = useState(null);
    const [secondPick, setSecondPick] = useState(null);
    const [disabled, setDisabled] =  useState(false);

    async function createCard (pkmnName){        
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnName}`);
                if(!response.ok){
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
            const cardData = await response.json();
            return {
                id: crypto.randomUUID(),
                sprite: cardData.sprites.front_default,
                pkmnName: cardData.name,
                isFlipped: false,
                isMatched: false
            };

        } catch(error){ 
            console.error('Error:', error);
            return null;
        }
    }

    useEffect(() => 
    {
        async function getAllCards()
        {
            const names = ["pikachu", "bulbasaur", "squirtle", "charmander", "chikorita", "cyndaquil", "totodile", "bidoof"];
            const allCards = await Promise.all(
                names.flatMap(name => [createCard(name), createCard(name)])
            );
            const shuffled = allCards.sort(() => Math.random() - 0.5); //Chose a simpler shuffle pattern rather then one like the fisher-yates shuffle (for now at least)
            setCardArr(shuffled);
        }

        getAllCards();
    }, [])

   //   IN PROCESS OF BEING ABLE TO FLIP CARDS
   //   next step is to add a useEffect with a setInterval 
   //   inside to give players a second to memorize the cards before unflipping

   //   All the code between here and the long comment line is chatGPT code. Im studying it and 
   //   will try to replicate it without looking at it
   //   This is merely a test to see if the code works, so that i can review and learn from it
    useEffect(() => {
        if (firstPick && secondPick) {
        setDisabled(true);

        // Check match
        if (firstPick.pkmnName === secondPick.pkmnName) {
            setCardArr(prev =>
            prev.map(card => {
                if (card.pkmnName === firstPick.pkmnName) {
                return { ...card, isMatched: true };
                }
                return card;
            })
            );
            resetTurn();
        } else {
            setTimeout(() => {
            setCardArr(prev =>
                prev.map(card => {
                if (card.id === firstPick.id || card.id === secondPick.id) {
                    return { ...card, isFlipped: false };
                }
                return card;
                })
            );
            resetTurn();
            }, 1000); // delay before flipping back
        }
        }
  }, [firstPick, secondPick]);
   
    function handleCardClick(clickedCard){
        if(disabled || clickedCard.isFlipped || clickedCard.isMatched){
            return;
        }

        const flippedCard = {...clickedCard, isFlipped: true};
        setCardArr(prev => prev.map(card => (card.id === clickedCard.id ? flippedCard : card)));

        if(!firstPick){
            setFirstPick(flippedCard);
        } else if(!secondPick){
            setSecondPick(flippedCard);
        }
    }

    function resetTurn() {
    setFirstPick(null);
    setSecondPick(null);
    setDisabled(false);
  }
//////////////////////////////////////////////////////////////////////////
    return(<div id='cardBoard'>

        {cardArr.map(card => (
            <Card 
            sprite={card.sprite} 
            pkmnName={card.pkmnName} 
            key={card.id} 
            onClick={() => handleCardClick(card)} 
            isFlipped={card.isFlipped || card.isMatched}/>
        ))}

    </div>);
}

export default Board;