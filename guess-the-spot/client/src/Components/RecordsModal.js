import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Table } from 'react-bootstrap'
require('dotenv').config()

const sortScoreBox = (scoreBox) => {
    if(scoreBox) {
        const records = scoreBox.slice();
        records.sort((a,b)=> {return a.failures - b.failures})
        return  records.sort((a, b) => {return b.successes - a.successes});
    }
}

function RecordsModal({ scoreBox ,showRecordsModal, setShowRecordsModal }) {

    const [sortedScoreBox, setSortedScoreBox] = useState();

    useEffect(()=> {
        setSortedScoreBox(sortScoreBox(scoreBox))
    },[scoreBox])


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
                        </tr>
                    </thead>
                    <tbody>
                        {sortedScoreBox && sortedScoreBox.map((record, i) => (
                        <tr>
                        <td>{i+1}</td>
                        <td>{record.player}</td>
                        <td>{record.successes}</td>
                        <td>{record.failures}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
                מי יישאר אלוף האלופים?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={()=>{setShowRecordsModal(false)}}>close</Button>
            </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RecordsModal;
