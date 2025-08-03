import './App.css'
import Board from './components/board.jsx';
import React, {useState} from 'react';
import Footer from './components/Footer.jsx';

function App() {

  const [difficulty, setDiffculty] = useState("Medium");

  return (
    <div>
      <main>
        <h1 style={{fontSize: '2.5rem'}}>Pokemon Memory Game</h1>  
        <div id='btns'>    
          <button id='easyBtn' onClick={() => setDiffculty('Easy')}>Easy</button>
          <button id='normalBtn' onClick={() => setDiffculty('Medium')}>Normal</button>
          <button id='hardBtn' onClick={() => setDiffculty('Hard')}>Hard</button>
        </div>
        
        <br /><br />

        <Board difficulty={difficulty} setDifficulty={setDiffculty}/>
      </main>
      <Footer />
    </div>
  )
}

export default App
