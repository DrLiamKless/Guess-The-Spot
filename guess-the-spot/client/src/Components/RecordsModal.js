import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap'
require('dotenv').config()

const sortScoreBox = (scoreBox) => {
    if(scoreBox) {
        const records = scoreBox.slice();
        records.sort((a,b)=> {return a.failures - b.failures})
        return  records.sort((a, b) => {return b.successes - a.successes});
    }
}

function RecordsModal({ setScoreBox ,scoreBox ,showRecordsModal, setShowRecordsModal }) {

    const [sortedScoreBox, setSortedScoreBox] = useState();

    useEffect(()=> {
        setSortedScoreBox(sortScoreBox(scoreBox))
    },[scoreBox])

    const clearRocords = () => {
        localStorage.removeItem('scoreBox');
        setScoreBox(null)
    }


  return (
    <div className="records-modal">
        <Modal className="starting-modal" show={showRecordsModal} centered>
            <Modal.Header>
            <Modal.Title>Records</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Number Of Successes</th>
                        <th>Number Of Failures</th>
                        <th>Success Average Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedScoreBox && sortedScoreBox.map((record, i) => (
                        <tr key={i}>
                        <td>{i+1}</td>
                        <td>{record.name}</td>
                        <td>{record.successes}</td>
                        <td>{record.failures}</td>
                        <td>{record.averageSuccessTime.toFixed(2)} sec</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
                מי יישאר אלוף האלופים?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={()=>{setShowRecordsModal(false)}}>close</Button>
                <Button variant="outline-warning" onClick={clearRocords}>Clear Records</Button>
            </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RecordsModal;
