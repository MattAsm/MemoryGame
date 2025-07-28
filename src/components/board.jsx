import Card from './card.jsx';
import React, { useRef, useState, useEffect } from 'react';
import './board.css';

function Board(){

    const [cardArr, setCardArr] = useState([]);


    async function createCard (pkmnName){        
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnName}`);
                if(!response.ok){
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
            const cardData = await response.json();
            return {
                sprite: cardData.sprites.front_default,
                pkmnName: cardData.name
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
            const shuffled = allCards.sort(() => Math.random() - 0.5); //Choose a simpler shuffle pattern rather then one like the fisher-yates shuffle (for now at least)
            setCardArr(shuffled);
        }

        getAllCards();
    }, [])

    return(<div id='cardBoard'>

        {cardArr.map((card, index) => (
            <Card sprite={card.sprite} pkmnName={card.pkmnName} key={index}/>
        ))}

    </div>);
}

export default Board;