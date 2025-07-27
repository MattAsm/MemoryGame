import './card.css';

function card({ sprite, pkmnName }){

    return(<div id='card'>
        <img src={sprite} alt={pkmnName} />
    </div>);
}

export default card;