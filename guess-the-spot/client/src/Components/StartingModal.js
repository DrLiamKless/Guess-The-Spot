import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap'
require('dotenv').config()

const footerStyle = {
  color: 'red',
}

function StartingModal({ player ,setPlayer ,setStarted, showStartModal, setShowStartModal }) {
  const [noUserName, setNoUserName] = useState(false);

    const handleClose = () => setShowStartModal(false);
    const handleShowStartModal = () => setShowStartModal(true);
    const userNameInput = useRef();

    useEffect(() => {
        handleShowStartModal(true)
    },[])

    const startGame = (name) => { 
      if (name) {
        setStarted(true); handleClose(); setPlayer(name); setNoUserName(false);
      } else {
        setNoUserName(true)
      }
    }

  return (
    <div className="starting-modal">
        <Modal className="starting-modal" show={showStartModal} centered>
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
            <Modal.Footer style={footerStyle}>
            <FormControl 
              ref={userNameInput}
              as='input'
              placeholder='userName'
              size='sm'
              defaultValue={player ? player : ''}
              >
            </FormControl>
              {noUserName &&
            'Please enter name'
              }
            <Button variant="success" onClick={()=>{startGame(userNameInput.current.value)}}>
                Start!
            </Button>
            </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StartingModal;
