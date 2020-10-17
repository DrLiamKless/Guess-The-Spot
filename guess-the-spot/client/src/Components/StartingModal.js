import React, { useState, useCallback, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap'
require('dotenv').config()


function StartingModal({ setStarted, showModal, setShowModal }) {

    const handleClose = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    useEffect(() => {
        handleShowModal(true)
    },[])

  return (
    <div className="starting-modal">
        <Modal className="starting-modal" show={showModal} centered>
            <Modal.Header>
            <Modal.Title>Welcome to the Spot Guesser 2020 !</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            In those difficult times, we don't get to travel often.<br/>
            This game gives you the opportunity to keep your navigation skills fresh,
            and maybe a good place to visit after this wild times will be over will pop-up to.<br/><br/>
            <strong>Rules:</strong><br/>
            Very simple - score at least 10 Km/Miles close to the spot<br/><br/>
            <strong>levels:</strong><br/>
            easy - Generates only big citys and known villages.<br/>
            medium - Starts to get nasty... adding variuos villages which can really get things harder..<br/>
            hard - Just as it sounds. All the spots are in!<br/><br/>
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
