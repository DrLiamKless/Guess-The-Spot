import React from 'react';
import '../App.css';
import { Form, Col } from 'react-bootstrap'

const randomSpotId = () => Math.floor(Math.random() * 1240)

function Controllers({ startGame }) {
  return (
    <div className="controllers-bar">
        {/* <Form>
            <Form.Row>
                    <Form.Label>Level</Form.Label>
                    <Form.Control as="select" size="sm" custom>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                    </Form.Control>
                    <Form.Label>Choose Region</Form.Label>
                    <Form.Control as="select" size="sm" custom>
                    <option>North</option>
                    <option>South</option>
                    </Form.Control>
                    <Form.Label>Calculate By</Form.Label>
                    <Form.Control as="select" size="sm" custom>
                    <option>Absolute</option>
                    <option>Walk</option>
                    <option>McDonald's</option>
                    </Form.Control>
            </Form.Row>
        </Form> */}
        <button onClick={() => {startGame(randomSpotId())}}>start</button>
    </div>
  );
}

export default Controllers;
