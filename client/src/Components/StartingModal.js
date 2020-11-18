import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap'

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
            This game gives you the opportunity to keep your navigation skills fresh and your kids busy!<br/><br/>
            <h3>Rules</h3>
            Very simple - score at least 10 Km/ 6 Miles close to the spot.<br/>
            If you want to change username (for the records-list), just press on the info button.<br/><br/>
            <h3>levels</h3>
            <strong>easy:</strong> Generates only big citys and known villages. Your map has borders, labels and roads.
            You can also skip hard places or try again if you failed.<br/><br/>
            <strong>medium:</strong> Starts to get Nasty! adding variuos villages which really get things harder.. 
            Also the map is more short in details<br/><br/>
            <strong>hard:</strong> Just as it sounds. All the spots are in, dark map, no second chances.<br/><br/>
            <strong>So let's see - Who Is The Best Guesser!?</strong>
            </Modal.Body>
            <Modal.Footer style={footerStyle}>
            <FormControl 
              ref={userNameInput}
              as='input'
              placeholder='username'
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
