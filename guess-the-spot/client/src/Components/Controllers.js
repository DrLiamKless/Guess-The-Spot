import React, { useEffect } from 'react';
import '../App.css';
import { Form, Col, Card, Button } from 'react-bootstrap'


const randomSpotId = () => Math.floor(Math.random() * 1240)

const cardStyle = {
    position:'fixed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '10vh',
    marginTop: '10vh',
    zIndex: '2',
    fontSize: '15px',
    width: '25vw',
    height: '50vh',
    width: '20vw',
  }


function Controllers({ started, getSpotToGuess, spotToGuess, spotGuessed, setSpotGuessed, winner, guessDistance }) {

    const next = () => {
        getSpotToGuess(randomSpotId())
    }

    const tryAgain = () => {
        setSpotGuessed(null)
    }

    useEffect(() => {
        if(started) {
            getSpotToGuess(randomSpotId())
        }
    },[started])

  return (
        <Card style={cardStyle} text="light" bg="dark">
            <Card.Body>

                <Card.Title>Guess The Spot</Card.Title>

                <Card.Subtitle className="mb-2 text-muted">?הידעת את הארץ</Card.Subtitle>

                <Card.Text className="spot-to-guess">
                {spotToGuess && <h4>{spotToGuess.name}</h4>}
                </Card.Text>

                <Card.Text className="messages">
                    { !winner &&
                        spotToGuess && !spotGuessed ? 
                            <div>
                                <h4>goodLuck</h4>
                                <Button onClick={()=>{next()}}>Next</Button>
                            </div> 
                        : winner === false && 
                            <div className="failure-message">
                                <h6>{guessDistance} KM far... <br/>give it another try!</h6>
                                <div className="failure-buttons">
                                    <Button variant="warning" onClick={()=>{tryAgain()}}>Try Again</Button>
                                    <Button variant="danger" onClick={()=>{next()}}>Next</Button>
                                </div> 
                            </div>
                    }
                    { winner === true &&
                    <div> 
                        <h6>Great! only {guessDistance} KM</h6>
                        <Button variant="success" onClick={()=>{next()}}>Another One!</Button> 
                    </div>
                    }

                </Card.Text>
            </Card.Body>
        </Card>
  );
}

export default Controllers;

{/* <Form>
    <Form.Row>
            <Form.Label>Level</Form.Label>
            <Form.Control as="select" size="sm" custom>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
            </Form.Control>
            <Form.Label>Choose Region</Form.Label>
            <Form.Control as="select" size="sm" custom>
            <option>North</option>
            <option>South</option>
            </Form.Control>
            <Form.Label>Calculate By</Form.Label>
            <Form.Control as="select" size="sm" custom>
            <option>Absolute</option>
            <option>Walk</option>
            <option>McDonald's</option>
            </Form.Control>
    </Form.Row>
</Form> */}