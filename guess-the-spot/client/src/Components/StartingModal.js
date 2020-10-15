import React, { useState, useCallback, useEffect } from 'react';
import '../App.css';
import { Modal, Button } from 'react-bootstrap'
require('dotenv').config()


function StartingModal({ setStarted }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        handleShow(true)
    },[])

  return (
    <div className="starting-modal">
        <Modal show={show} centered>
            <Modal.Header closeButton>
            <Modal.Title>Welcome to the Spot Guesser 2020 !</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            In those difficult times, we don't get to travel often.<br/>
            This game gives you the opportunity to keep your navigation skills fresh,
            and to refresh your mind for a good place to visit in the After-Corona times.<br/><br/>
            *notice that you may have a few chances, but everything is written in our ScoreBox...<br/>
            So let's see - Who Is The Best Guesser!? 
            </Modal.Body>
            <Modal.Footer>
            <Button variant="success" onClick={() => {setStarted(true); handleClose();}}>
                Start!
            </Button>
            </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StartingModal;
