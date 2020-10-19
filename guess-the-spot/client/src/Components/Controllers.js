import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap'
import NavBar from './NavBar'

const cardStyle = {
    position:'fixed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '15px',
    minHeight: '340px',
    maxHeight: '340px',
    minWidth: '300px',
    maxWidth: '300px',
    borderRadius: '15px',
    border: 'solid 1px black',
    boxShadow: '1px 1px 7px 1px rgb(52,58,64)'
  }


function Controllers({ 
    setShowRecordsModal, 
    player, 
    setWinner, 
    setShowStartModal, 
    message, 
    started, 
    getSpotToGuess,
    spotToGuess, 
    spotGuessed, 
    setSpotGuessed,
    winner, 
    setPrefernces, 
    preferences,
    handleStartGuessing,
    handleTryAgain,
    timer,
    timeStopped
}) {
    
    const randomSpotId = () => (
        preferences.level === 'easy' ? Math.floor(Math.random() * 377) 
        : preferences.level === 'med' ? Math.floor(Math.random() * 708)
        : preferences.level ==='hard' && Math.floor(Math.random() * 1180)
    )
    
    const next = () => {
        getSpotToGuess(randomSpotId());
        setWinner(false);
        setSpotGuessed(null);
    }

  return (
        <Card style={cardStyle} text="light" bg="dark">
            <NavBar 
                setPrefernces={setPrefernces} 
                setShowStartModal={setShowStartModal}
                timer={timer}
                timeStopped={timeStopped}
                setShowRecordsModal={setShowRecordsModal}
                timer={timer}>
            </NavBar>
            <Card.Body>

                <Card.Title>Guess The Spot</Card.Title>
                
                <Card.Subtitle className="mb-2 text-muted">היי {player}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">?הידעת את הארץ</Card.Subtitle>

                <Card.Text className="spot-to-guess">
            
                {started ? 
                spotToGuess && <h4>{spotToGuess.name}</h4> : 
                <Button variant='success' size='sm' onClick={()=>{handleStartGuessing(randomSpotId())}}>Start!</Button>}
                
                </Card.Text>

                <Card.Text className="messages">
                    { !winner &&
                            spotGuessed === null ? 
                            <div>
                                <h4>goodLuck</h4>
                                {preferences.level === 'easy' &&
                                <Button size='sm' variant="outline-primary" onClick={()=>{next()}}>Skip</Button>
                                }
                            </div> 
                            : winner === false ? 
                                <div className="failure-message">
                                    {message}
                                    <div className="failure-buttons">
                                        {preferences.level === 'easy' &&
                                        <Button size='sm' variant="outline-warning" onClick={()=>{handleTryAgain()}}>Try Again</Button>
                                        }
                                        <Button size='sm' variant="outline-danger" onClick={()=>{handleStartGuessing(randomSpotId())}}>Next</Button>
                                    </div> 
                                </div>
                    
                            : winner === true &&
                            <div> 
                                {message}
                                <Button size='sm' variant="success" onClick={()=>{handleStartGuessing(randomSpotId())}}>Another One!</Button> 
                            </div>
                    }

                </Card.Text>
    
            </Card.Body>
        </Card>
        );
    }
    
    export default Controllers;