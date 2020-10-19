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
    const [timer, setTimer] = useState();
    const [timeStopped, setTimeStopped] = useState();

    useEffect(() => {
        if (timer && timer !== 0 && !timeStopped) {
            const num = timer - 1
            setTimeout(()=>{
                setTimer(num)
            },1000)
        } else if (timer === 0) {
            HandleGuess(0);
        } else if (timeStopped) {
            setTimer(false);
        } else {
            return
        }
    } ,[timer])

    const createMessage = (distance) => {
        const messages = preferences && {
            winner:
            preferences.units === 'km' ? `Great! only ${(distance/1000).toFixed(2)} KM far!!` : 
            `Great! only ${(distance/1609.344).toFixed(2)} miles far!!`,
            loser:
            preferences.units === 'km' ? `${(distance/1000).toFixed(2)} KM far... <br/>give it another try!` :
            `${(distance/1609.344).toFixed(2)} Miles far... <br/>give it another try!`,
            outOfTime: 'To slow...'
        }
        return messages
    }

    const handleStartGuessing = (randomIndex) => {
        if(!spotToGuess) { // if its the first guess 
            setStarted(true);
            getSpotToGuess(randomIndex);
            setTimer(10);
        } else { //in the next guesses
            setStarted(true);
            setTimeStopped(false);
            getSpotToGuess(randomIndex);
            setTimer(10);
            setWinner(false);
            setSpotGuessed(null)
        }
    }

    const handleTryAgain = () => {
        setStarted(true);
        setTimeStopped(false);
        setTimer(10);
        setWinner(false);
        setSpotGuessed(null)
    }

    const handleScoreBox = (name, isSucceed, timeToGuess) => { // todo: add time to scoreBox
        const records = scoreBox ? scoreBox.slice() : [];
        for (let i = 0; i <= records.length; i++) {
            if (records[i] && records[i].name === name) {
                const player = records[i]
                if(timeToGuess) {
                    player.averageSuccessTime = player.averageSuccessTime ? 
                    (( (player.averageSuccessTime*player.successes) + timeToGuess ) / (player.successes + 1).toFixed(2)) :
                    timeToGuess
                }
                player[isSucceed] = player[isSucceed]+=1
                setScoreBox(records)
                localStorage.setItem('scoreBox', JSON.stringify(records))
                return
            }
        }
            const newRecord = {name, successes: 0, failures: 0, averageSuccessTime: timeToGuess || 0}
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
        if(lat === 0 ) { // when time runs out
            setTimeStopped(0);
            setTimer(false);
            setSpotGuessed(false);
            setWinner(false);
            setMessage(createMessage(0).outOfTime);
            handleScoreBox(player, 'failures');
            return
        };

        if(spotToGuess && spotGuessed === null){ // when guessed, can press only when place is given
            const currentTime = timer;
            setTimer(false);
            setTimeStopped(currentTime);
            
            if(!spotGuessed) { // only if got a spot..
                const spot = {lat, lng};
                setSpotGuessed(spot);
                const distance = getAbsoluteDistance(spot['lat'], spot['lng'], spotToGuess['lat'], spotToGuess['lng'], preferences.units)
                setGuessDistance(distance)
                if(preferences.units ==='km') {
                    if (distance < 10000) { // 10 km
                        setWinner(true)
                        setMessage(createMessage(distance).winner)
                        handleScoreBox(player, 'successes', (10-currentTime))
                    } else {
                        setWinner(false)
                        setMessage(createMessage(distance).loser)
                        handleScoreBox(player, 'failures')
                    }
                } else if (preferences.units === 'miles') {
                    if (distance < 1609.344*6) { // 6 miles 
                        setWinner(true)
                        setMessage(createMessage(distance).winner)
                        handleScoreBox(player, 'successes', (10-currentTime))
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
        setShowStartModal={setShowStartModal}
        showStartModal={showStartModal}
        player={player}
        setPlayer={setPlayer}>
        </StartingModal>

        <RecordsModal 
        showRecordsModal={showRecordsModal}
        setShowRecordsModal={setShowRecordsModal}
        scoreBox={scoreBox}
        setScoreBox={setScoreBox}>
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
                handleStartGuessing={handleStartGuessing}
                handleTryAgain={handleTryAgain}
                timer={timer}
                setTimer={setTimer}
                timeStopped={timeStopped}>
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
