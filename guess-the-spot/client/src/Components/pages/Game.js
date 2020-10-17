import React, { useEffect, useState } from 'react';
import Map from '../Map';
import Controllers from '../Controllers';
import places from '../../data/places.json';
import Draggable from 'react-draggable';
import StartingModal from '../StartingModal';
import RecordsModal from '../RecordsModal';
const getAbsoluteDistance = require('../../helpers/getAbsoluteDistance')

const notEasyPlacesTypes = ["2000-9999 תושבים,ישובים יהודים","ישובים כפריים אחרים לא יהודים" ,"ישובים קהילתיים", "ללא סוג", "מושבים (כפרים שיתופיים) (ב)", "2000-9999 תושבים,ישובים לא יהודים", "10000-19999 תושבים,ישובים לא יהודים", "2000-9999 תושבים,ישובים לא יהודים", "מושבים שיתופיים", "ישובים כפריים יהודים אחרים"]
const notMediumPlacesTypes = ["2000-9999 תושבים,ישובים לא יהודים", "ללא סוג", "מושבים (כפרים שיתופיים) (ב)", "2000-9999 תושבים,ישובים לא יהודים"]

function Game() {

    const [started, setStarted] = useState();
    const [spotToGuess, setSpotToGuess] = useState();
    const [spotGuessed, setSpotGuessed] = useState();
    const [guessDistance, setGuessDistance] = useState();
    const [preferences, setPrefernces] = useState({level: 'easy', distance:'absolute', units: 'km'});
    const [message, setMessage] = useState();
    const [showStartModal, setShowStartModal] = useState(false);
    const [showRecordsModal, setShowRecordsModal] = useState(false);
    const [winner, setWinner] = useState();
    const [player, setPlayer] = useState();
    const [scoreBox, setScoreBox] = useState(JSON.parse(localStorage.getItem('scoreBox')));


    // useEffect(() => {
    //     console.log(scoreBox)
    // },[])

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

    const handleScoreBox = (player, isSucceed) => { // todo: add time to scoreBox
        const records = scoreBox ? scoreBox.slice() : [];
        for (let i = 0; i <= records.length; i++) {
            if (records[i] && records[i].player === player) {
                console.log('1')
                records[i][isSucceed] = records[i][isSucceed]+=1
                setScoreBox(records)
                localStorage.setItem('scoreBox', JSON.stringify(records))
                return
            }
        }
            console.log('2')
            const newRecord = {player, successes: 0, failures: 0}
            newRecord[isSucceed] = newRecord[isSucceed]+=1
            records.push(newRecord);
            setScoreBox(records)
            localStorage.setItem('scoreBox', JSON.stringify(records))
            return
    }

    const getSpotToGuess = (spotIndex) => {
        if (preferences.level === 'easy') {
            setSpotToGuess(places.filter(place => !notEasyPlacesTypes.includes(place.type))[spotIndex]);
            setSpotGuessed(null);
        } else if (preferences.level === 'med') {
            setSpotToGuess(places.filter(place => !notMediumPlacesTypes.includes(place.type))[spotIndex]);  
            setSpotGuessed(null);
        } else if (preferences.level === 'hard') {
            setSpotToGuess(places[spotIndex]);
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
                if(preferences.units ==='km') {
                    if (distance < 10000) { // 10 km
                        setWinner(true)
                        setMessage(createMessage(distance).winner)
                        handleScoreBox(player, 'successes')
                        console.log(scoreBox);
                    } else {
                        setWinner(false)
                        setMessage(createMessage(distance).loser)
                        handleScoreBox(player, 'failures')
                        console.log(scoreBox);
                    }
                } else if (preferences.units ==='miles') {
                    if (distance < 1609.344*6) { // 6 miles 
                        setWinner(true)
                        setMessage(createMessage(distance).winner)
                        handleScoreBox(player, 'successes')
                    } else {
                        setWinner(false)
                        setMessage(createMessage(distance).loser)
                        handleScoreBox(player, 'failures')
                    }
                }
            }
        }
    }

  return (
    <div className="game">
        <StartingModal 
        setStarted={setStarted}
        setShowStartModal={setShowStartModal}
        showStartModal={showStartModal}
        player={player}
        setPlayer={setPlayer}    >
        </StartingModal>

        <RecordsModal 
        showRecordsModal={showRecordsModal}
        setShowRecordsModal={setShowRecordsModal}
        scoreBox={scoreBox}
        setScoreBox={setScoreBox}
        >
        </RecordsModal>

        <Draggable>
            <div className="game-controllers">
                <Controllers
                getSpotToGuess={getSpotToGuess}
                spotToGuess={spotToGuess}
                spotGuessed={spotGuessed}
                winner={winner}
                setWinner={setWinner}
                guessDistance={guessDistance}
                setSpotGuessed={setSpotGuessed}
                started={started}
                setPrefernces={setPrefernces}
                preferences={preferences}
                message={message}
                setShowStartModal={setShowStartModal}
                player={player}
                showRecordsModal={showRecordsModal}
                setShowRecordsModal={setShowRecordsModal}
                >
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
