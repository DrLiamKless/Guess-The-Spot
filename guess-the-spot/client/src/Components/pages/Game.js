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
    const [winner, setWinner] = useState(null);

    const startGame = (spotId) => {
        setSpotToGuess(places[spotId]);
        setSpotGuessed(null);
    }

    const HandleGuess = (lat, lng) => {
        if(spotToGuess){
            if(!spotGuessed) {
                const spot = {lat, lng};
                setSpotGuessed(spot);
                const distance = getAbsoluteDistance(spot['lat'], spot['lng'], spotToGuess['lat'], spotToGuess['lng'])
                setGuessDistance(distance)
                if (distance < 10) {
                    console.log(distance)
                    setWinner(true)
                } else {
                    setWinner(false)
                    console.log(distance)
                }
            }
        }
    }

  return (
    <div className="game">

        <div className="game-controllers">
            
            <Controllers startGame={startGame}>
            </Controllers>

        {spotToGuess && <h4>{spotToGuess.name}</h4>}
        { winner === null ? <h4>Press Start To begin</h4> 
        : winner === false ? <h4>{guessDistance} KM far... give it another try!</h4> 
        : <h4>Great! only {guessDistance} KM</h4> }
        </div>

        <Map 
        HandleGuess={HandleGuess}
        places={places}
        spotToGuess={spotToGuess}
        spotGuessed={spotGuessed}>
        </Map>

    </div>
  );
}

export default Game;
