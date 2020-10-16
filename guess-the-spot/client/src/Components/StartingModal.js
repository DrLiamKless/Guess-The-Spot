import React, { useState, useCallback, useEffect } from 'react';
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
        <Modal className="starting-modal" show={show} centered>
            <Modal.Header closeButton>
            <Modal.Title>Welcome to the Spot Guesser 2020 !</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            In those difficult times, we don't get to travel often.<br/><br/>
            This game gives you the opportunity to keep your navigation skills fresh,
            and maybe a good place to visit in the After-Corona times will pop-up to.<br/><br/><br/>
            **you may use a second try, but everything is written in our ScoreBox...**<br/><br/>
            <strong>So let's see - Who Is The Best Guesser!?</strong>
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
