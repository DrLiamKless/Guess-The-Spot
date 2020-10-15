import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Game from './Components/pages/Game'
import StartingModal from './Components/StartingModal';

function App() {
  const [started, setStarted] = useState();
  
  return (
    <div className="App">
      <StartingModal setStarted={setStarted}/>
      <Game started={started}/>
    </div>
  );
}

export default App;
