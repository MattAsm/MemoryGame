import Card from './card.jsx';
import React, { useRef, useState, useEffect } from 'react';
import './board.css';

function board(){

    const [sprite, setSprite] = useState(null);
    const [pkmnName, setPkmnName] = useState(null);
    const [difficulty, setDifficulty] = useState("Easy"); //16 for 4x4 (Medium)/ 36 for 6x6 (Hard)
                                                        //Adding difficulty after, for now hardcode Medium

    fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
        .then(response => {
            if(!response.ok){
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setSprite(data.sprites.front_default);
            setPkmnName(data.name);
        })
        .catch(error => console.error('Error:', error));

    return(<div id='cardBoard'>
    <Card sprite={sprite} pkmnName={pkmnName}/>
    <Card sprite={sprite} pkmnName={pkmnName}/>
    <Card sprite={sprite} pkmnName={pkmnName}/>
    <Card sprite={sprite} pkmnName={pkmnName}/>

    <Card sprite={sprite} pkmnName={pkmnName}/>
    <Card sprite={sprite} pkmnName={pkmnName}/>
    <Card sprite={sprite} pkmnName={pkmnName}/>
    <Card sprite={sprite} pkmnName={pkmnName}/>
    
    <Card sprite={sprite} pkmnName={pkmnName}/>
    <Card sprite={sprite} pkmnName={pkmnName}/>
    <Card sprite={sprite} pkmnName={pkmnName}/>
    <Card sprite={sprite} pkmnName={pkmnName}/>

    <Card sprite={sprite} pkmnName={pkmnName}/>
    <Card sprite={sprite} pkmnName={pkmnName}/>
    <Card sprite={sprite} pkmnName={pkmnName}/>
    <Card sprite={sprite} pkmnName={pkmnName}/>
    </div>);
}

export default board;