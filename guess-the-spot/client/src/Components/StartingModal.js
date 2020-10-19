import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap'
require('dotenv').config()

const footerStyle = {
  color: 'red',
}

function StartingModal({ player ,setPlayer ,handleStart, showStartModal, setShowStartModal }) {
  const [noUserName, setNoUserName] = useState(false);
  const userNameInput = useRef();

    const handleClose = (name) => {
      if (name) {
        setPlayer(name);
        setShowStartModal(false);
      } else {
        setNoUserName(true)
      }
    };

    const handleShowStartModal = () => setShowStartModal(true);

    useEffect(() => {
        handleShowStartModal(true)
    },[])

  return (
    <div className="starting-modal">
        <Modal className="starting-modal" show={showStartModal} centered>
            <Modal.Header>
            <Modal.Title>Welcome to the Spot Guesser 2020 !</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            In those difficult times, we don't get to travel often.<br/>
            This game gives you the opportunity to keep your navigation skills fresh,
            and maybe a good place to visit after this wild times is over will pop-up to.<br/><br/>
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
            <Button variant="success" onClick={()=>{handleClose(userNameInput.current.value);}}>
                Start Playin'!
            </Button>
            </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StartingModal;
