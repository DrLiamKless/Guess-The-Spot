import React, { useState } from 'react';
import '../../App.css';
import Map from '../Map';
import Controllers from '../Controllers';
import places from '../../data/places.json';
import Draggable, {DraggableCore} from 'react-draggable';
const getAbsoluteDistance = require('../../helpers/getAbsoluteDistance')

function Game({ started }) {

    const [spotToGuess, setSpotToGuess] = useState();
    const [spotGuessed, setSpotGuessed] = useState();
    const [guessDistance, setGuessDistance] = useState();
    const [winner, setWinner] = useState(null);

    const getSpotToGuess = (spotId) => {
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
        
        <Draggable>
            <div className="game-controllers">
                    <Controllers
                    getSpotToGuess={getSpotToGuess}
                    spotToGuess={spotToGuess}
                    spotGuessed={spotGuessed}
                    winner={winner}
                    guessDistance={guessDistance}
                    setSpotGuessed={setSpotGuessed}
                    started={started}>
                    </Controllers>
            </div>
        </Draggable>

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
