import React, {useRef, useState } from 'react';
import { Form, Card, Button, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../../Contexts/AuthContext'
import { Link } from 'react-router-dom';

function Forgot() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e) {
      e.preventDefault()

    try {
        setLoading(true)
        setError('');
        await resetPassword(emailRef.current.value);
        setMessage('check your inbox for further instructions');
    } catch(err) {
        setError("failed to reset")
    }
    setLoading(false)
  }

  
  return (
    <>
    <Card className="auth"> 
        <Card.Body>
            <h2 className="text-center mb-4">Reset Password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef}></Form.Control>
                </Form.Group>
                <Button disable={loading} type="submut" className="w-100">Log In</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className="w-100 text-center mt-3">
        <Link to="signup">Sign Up</Link>
    </div>
    <div className="auth-bottom">
        <Link to="/signup">Log In</Link>
    </div>

    </>
  );
}

export default Forgot;
