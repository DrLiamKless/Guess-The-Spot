import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext';

const footerStyle = {
  color: 'red',
}

function StartingModal({ showStartModal, setShowStartModal }) {
  const [noUserName, setNoUserName] = useState(false);
  const { logout } = useAuth()

    const handleClose = (name) => {
        setShowStartModal(false);
    };

    const handleShowStartModal = () => setShowStartModal(true);

    useEffect(() => {
        handleShowStartModal(true)
    },[])


  const continuePlaying = () => {
    setShowStartModal(false);
  }

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
            {noUserName &&
              'Please login'
            }
            <Button variant="primary" onClick={continuePlaying}>continue</Button>
            <Button variant="danger" onClick={logout}>Sign Out</Button>
            </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StartingModal;
