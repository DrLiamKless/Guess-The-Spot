import React, { useEffect, useState } from 'react';
import Map from '../Map';
import Controllers from '../Controllers';
import places from '../../data/places.json';
import Draggable from 'react-draggable';
const getAbsoluteDistance = require('../../helpers/getAbsoluteDistance')

const notEasyPlacesTypes = ["2000-9999 תושבים,ישובים יהודים","ישובים כפריים אחרים לא יהודים" ,"ישובים קהילתיים", "ללא סוג", "מושבים (כפרים שיתופיים) (ב)", "2000-9999 תושבים,ישובים לא יהודים", "10000-19999 תושבים,ישובים לא יהודים", "2000-9999 תושבים,ישובים לא יהודים", "מושבים שיתופיים", "ישובים כפריים יהודים אחרים"]
const notMediumPlacesTypes = ["2000-9999 תושבים,ישובים לא יהודים", "ללא סוג", "מושבים (כפרים שיתופיים) (ב)", "2000-9999 תושבים,ישובים לא יהודים"]

function Game({ started }) {

    const [spotToGuess, setSpotToGuess] = useState();
    const [spotGuessed, setSpotGuessed] = useState();
    const [guessDistance, setGuessDistance] = useState();
    const [preferences, setPrefernces] = useState();
    const [winner, setWinner] = useState(null);

    const getSpotToGuess = (spotId) => {
        if (preferences.level === 'easy') {
            setSpotToGuess(places.filter(place => !notEasyPlacesTypes.includes(place.type))[spotId]);
            console.log('easy:',places.filter(place => { return !notEasyPlacesTypes.includes(place['type'])}).length)
            setSpotGuessed(null);
        } else if (preferences.level === 'med') {
            setSpotToGuess(places.filter(place => !notMediumPlacesTypes.includes(place.type))[spotId]);           
            console.log('medium:',places.filter(place => { return !notMediumPlacesTypes.includes(place.type)}).length)
            setSpotGuessed(null);
        } else if (preferences.level === 'hard') {
            setSpotToGuess(places[spotId]);
            setSpotGuessed(null);
        }
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
                    started={started}
                    setPrefernces={setPrefernces}
                    preferences={preferences}>
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
