import './App.css'
import Board from './components/board.jsx';
import React, {useState} from 'react';

function App() {

  const [difficulty, setDiffculty] = useState("Medium");

  return (
    <div>
      <h1 style={{fontSize: '2.5rem'}}>Pokemon Memory Game</h1>      
      <button id='easyBtn' onClick={() => setDiffculty('Easy')}>Easy</button>
      <button id='normalBtn' onClick={() => setDiffculty('Medium')}>Normal</button>
      <button id='hardBtn' onClick={() => setDiffculty('Hard')}>Hard</button>
      <br /><br />

      <Board difficulty={difficulty} setDifficulty={setDiffculty}/>
      
    </div>
  )
}

export default App
