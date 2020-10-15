import React, { useState } from 'react';
import '../../App.css';
import Map from '../Map';
import Controllers from '../Controllers';
import places from '../../data/places.json';
const getAbsoluteDistance = require('../../helpers/getAbsoluteDistance')

function Game() {
    const [spotToGuess, setSpotToGuess] = useState();
    const [spotGuessed, setSpotGuessed] = useState();
    const [guessDistance, setGuessDistance] = useState();

    const startGame = (spotId) => {
        setSpotToGuess(places[spotId])
    }

    const HandleGuess = (lat, lng) => {
        const spot = {lat, lng};
        setSpotGuessed(spot);
        setGuessDistance(getAbsoluteDistance(spot['lat'], spot['lng'], spotToGuess['lat'], spotToGuess['lng']))
        console.log(getAbsoluteDistance(spot['lat'], spot['lng'], spotToGuess['lat'], spotToGuess['lng']));
    }

  return (
    <div className="game">
        <div className="game-controllers">
            <Controllers startGame={startGame}>
            </Controllers>
        </div>
        {spotToGuess && <h1>{spotToGuess.name}</h1>}
        {guessDistance <= 10 ? <h1>Great! only {guessDistance} KM</h1> 
        : <h1>{guessDistance} KM far... give it another try!</h1> }
        <Map 
        HandleGuess={HandleGuess}
        places={places}
        spotToGuess={spotToGuess}
        spotGuessed={spotGuessed}
        >
        </Map>
    </div>
  );
}

export default Game;
