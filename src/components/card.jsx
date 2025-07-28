import './card.css';
import React, { useState, useEffect } from 'react';
import CardCover from '../assets/Pokeball.png';

function card({ sprite, pkmnName, isFlipped, onClick }){

    return(<div id='card' onClick={onClick}>
        <img src={isFlipped ? sprite : CardCover} alt={pkmnName}/>
    </div>);
}

export default card;