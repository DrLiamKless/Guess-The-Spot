import React, { useEffect, useState } from 'react';
import Map from '../Map';
import Controllers from '../Controllers';
import places from '../../data/places.json';
import Draggable from 'react-draggable';
import StartingModal from '../StartingModal';
const getAbsoluteDistance = require('../../helpers/getAbsoluteDistance')

const notEasyPlacesTypes = ["2000-9999 תושבים,ישובים יהודים","ישובים כפריים אחרים לא יהודים" ,"ישובים קהילתיים", "ללא סוג", "מושבים (כפרים שיתופיים) (ב)", "2000-9999 תושבים,ישובים לא יהודים", "10000-19999 תושבים,ישובים לא יהודים", "2000-9999 תושבים,ישובים לא יהודים", "מושבים שיתופיים", "ישובים כפריים יהודים אחרים"]
const notMediumPlacesTypes = ["2000-9999 תושבים,ישובים לא יהודים", "ללא סוג", "מושבים (כפרים שיתופיים) (ב)", "2000-9999 תושבים,ישובים לא יהודים"]

function Game() {

    const [spotToGuess, setSpotToGuess] = useState();
    const [spotGuessed, setSpotGuessed] = useState();
    const [guessDistance, setGuessDistance] = useState();
    const [preferences, setPrefernces] = useState({level: 'easy', distance:'absolute', units: 'km'});
    const [message, setMessage] = useState();
    const [showModal, setShowModal] = useState(false);
    const [started, setStarted] = useState();
    const [winner, setWinner] = useState(null);

    const createMessage = (distance) => {
        const messages = preferences && {
            winner:
            preferences.units === 'km' ? `Great! only ${(distance/1000).toFixed(2)} KM far!!` : 
            `Great! only ${(distance/1609.344).toFixed(2)} miles far!!`,
            loser:
            preferences.units === 'km' ? `${(distance/1000).toFixed(2)} KM far... <br/>give it another try!` :
            `${(distance/1609.344).toFixed(2)} Miles far... <br/>give it another try!`
        }
        return messages
    }

    const getSpotToGuess = (spotId) => {
        if (preferences.level === 'easy') {
            setSpotToGuess(places.filter(place => !notEasyPlacesTypes.includes(place.type))[spotId]);
            setSpotGuessed(null);
        } else if (preferences.level === 'med') {
            setSpotToGuess(places.filter(place => !notMediumPlacesTypes.includes(place.type))[spotId]);           
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
                const distance = getAbsoluteDistance(spot['lat'], spot['lng'], spotToGuess['lat'], spotToGuess['lng'], preferences.units)
                setGuessDistance(distance)
                if (distance < 10) {
                    setWinner(true)
                    setMessage(createMessage(distance).winner)
                } else {
                    setWinner(false)
                    setMessage(createMessage(distance).loser)
                }
            }
        }
    }

  return (
    <div className="game">
        <StartingModal 
        setStarted={setStarted}
        setShowModal={setShowModal}
        showModal={showModal}>
        </StartingModal>

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
                preferences={preferences}
                message={message}
                setShowModal={setShowModal}>
                </Controllers>
            </div>
        </Draggable>

        <Map 
        HandleGuess={HandleGuess}
        places={places}
        spotToGuess={spotToGuess}
        spotGuessed={spotGuessed}
        guessDistance={guessDistance}
        preferences={preferences}>
        </Map>

    </div>
  );
}

export default Game;
