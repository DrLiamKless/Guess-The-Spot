import React, { useEffect } from 'react';
import { Form, Col, Card, Button } from 'react-bootstrap'
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


function Controllers({ started, getSpotToGuess, spotToGuess, spotGuessed, setSpotGuessed, winner, guessDistance, setPrefernces, preferences }) {

    useEffect(() => {
        if(started) {
            getSpotToGuess(randomSpotId())
        }
    },[started])

    const next = () => {
        getSpotToGuess(randomSpotId())
    }

    const tryAgain = () => {
        setSpotGuessed(null)
    }

    const randomSpotId = () => (
        preferences.level === 'easy' ? Math.floor(Math.random() * 377) 
        : preferences.level === 'med' ? Math.floor(Math.random() * 708)
        : preferences.level ==='hard' && Math.floor(Math.random() * 1180)

    )


  return (
        <Card style={cardStyle} text="light" bg="dark">
            <NavBar setPrefernces={setPrefernces}></NavBar>
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
                                <Button size='sm' variant="outline-primary" onClick={()=>{next()}}>Skip</Button>
                            </div> 
                        : winner === false && 
                            <div className="failure-message">
                                <h6>{guessDistance} KM far... <br/>give it another try!</h6>
                                <div className="failure-buttons">
                                    <Button size='sm' variant="outline-warning" onClick={()=>{tryAgain()}}>Try Again</Button>
                                    <Button size='sm' variant="outline-danger" onClick={()=>{next()}}>Next</Button>
                                </div> 
                            </div>
                    }
                    { winner === true &&
                    <div> 
                        <h6>Great! only {guessDistance} KM</h6>
                        <Button size='sm' variant="success" onClick={()=>{next()}}>Another One!</Button> 
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