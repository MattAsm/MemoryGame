import Card from './card.jsx';
import React, { useRef, useState, useEffect } from 'react';
import './board.css';
import Timer from './timer.jsx';

function Board({ difficulty, setDifficulty }){

    const [cardArr, setCardArr] = useState([]);
    const [firstPick, setFirstPick] = useState(null);
    const [secondPick, setSecondPick] = useState(null);
    const [disabled, setDisabled] =  useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

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

    useEffect(() => {
        if(cardArr.length === 0) return;

        const cardCheck = cardArr.filter((card) => !card.isMatched);
        if(cardCheck.length === 0){
            console.log("Winner!");
            setIsTimerRunning(false);
        }
    }, [cardArr]);


    useEffect(() => 
    {
        async function getAllCards()
        {
            let names = [];
            switch(difficulty){
                case 'Easy':
                    document.querySelector('#root').style.setProperty('--board-width', '640px');
                    names = ["totodile", "bulbasaur", "squirtle", "charmander", 
                             "chikorita", "cyndaquil"];
                    break;

                case 'Medium':
                    document.querySelector('#root').style.setProperty('--board-width', '640px');
                    names = ["pichu", "ivysaur", "wartortle", "charmeleon", 
                             "bayleef", "quilava", "croconaw", "bidoof"];
                    break;
                
                case 'Hard':
                    document.querySelector('#root').style.setProperty('--board-width', '800px');
                    names = ["pikachu", "venusaur", "blastoise", "charizard", 
                             "meganium", "typhlosion", "feraligatr", "bibarel", "plusle", "minun"];  
                    break;

                default: //In case I miss spell something, or the code breaks for some reason, we default to medium
                    document.querySelector('#root').style.setProperty('--board-width', '640px');
                    names = ["pichu", "ivysaur", "wartortle", "charmeleon", 
                             "bayleef", "quilava", "croconaw", "bidoof"];
                    break;
            }
            const allCards = await Promise.all(
                names.flatMap(name => [createCard(name), createCard(name)])
            );
            const shuffled = allCards.sort(() => Math.random() - 0.5); //Chose a simpler shuffle pattern rather then one like the fisher-yates shuffle (for now at least)
            setCardArr(shuffled);
        }
        setIsTimerRunning(false);
        getAllCards();
    }, [difficulty])


    useEffect(() => {
       if(firstPick && secondPick){
        setDisabled(true);

        if(firstPick.pkmnName === secondPick.pkmnName){
        setCardArr(prev => prev.map(card => {
           if(card.pkmnName === firstPick.pkmnName){
            return {...card, isMatched: true};
           }
           else
            return card;
        }));
        resetTurn();
        } else {
        setTimeout(() => {
            setCardArr(prev => prev.map(card => {
                if(card.id === firstPick.id || card.id === secondPick.id){
                    return {...card, isFlipped: false};
                }
                return card;
            }));
            resetTurn();
        }, 1000);
      }
    }
  }, [firstPick, secondPick]);
   

    function handleCardClick(clickedCard){
        if(disabled || clickedCard.isFlipped || clickedCard.isMatched){
            return;
        }

        if(!isTimerRunning){
            setIsTimerRunning(true);
        }

        const flippedCard = {...clickedCard, isFlipped: true};
        setCardArr(prev => prev.map(card => card.id === clickedCard.id ? flippedCard : card));

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

  function restart(){
    location.reload(); //WIP: All it does rn is refresh the page
    //The goal is to restart the board without needing to re-render the page
  }

    return(<div id='cardBoard'>

        {cardArr.map(card => (
            <Card 
            sprite={card.sprite} 
            pkmnName={card.pkmnName} 
            key={card.id} 
            onClick={() => handleCardClick(card)} 
            isFlipped={card.isFlipped || card.isMatched}/>
        ))}

        <Timer isTimerRunning={isTimerRunning}/>

        <div id="centeringDiv">
            <button onClick={restart} id='restartButton'>Restart</button>
        </div>
        
    </div>);
}

export default Board;