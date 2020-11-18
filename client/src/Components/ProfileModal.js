import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext';

function ProfileModal({ showProfileModal, setShowProfileModal }) {
    
    // const [records] = useCollectionData(query);
    const { currentUser, logout } = useAuth()
    const [ error, setError ] = useState()

    
    // useEffect(() => {
    //     query.get().then((results)=>{
    //         console.log(results?.docs[0]?.data());
    //     });
    // })

   async function handleLogout() {
        setError('');

        try{
            await logout()
        } catch(e) {
            setError("failed to log out")
        }
    }




  return (
    <div className="records-modal">
        <Modal className="starting-modal" show={showProfileModal} centered>
            <Modal.Header>
                <Modal.Title>
                    Profile             
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            your email: {currentUser.email}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-warning" onClick={()=>{setShowProfileModal(false)}}>Close</Button>
            </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProfileModal;
