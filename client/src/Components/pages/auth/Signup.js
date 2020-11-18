import React,{ useRef, useState } from 'react';
import { Form, Card, Button, Alert} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../../Contexts/AuthContext'

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const history = useHistory();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


 async function handleSubmit(e) {
      e.preventDefault()

      if(passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("passwords do not match")
    }

    try {
        setLoading(true);
        setError('');
        await signup(emailRef.current.value, passwordRef.current.value);
        history.push("/login")
    } catch(err) {
        setError("failed to create an account")
    }
    setLoading(false)
  }

  
  return (
    <>
    <Card className="auth">
        <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Passowrd</Form.Label>
                    <Form.Control type="password" ref={passwordRef}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Passowrd Confirm</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef}></Form.Control>
                </Form.Group>
                <Button disable={loading} type="submit" className="w-100">Submit</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className="auth-bottom">
        Already have an acoount? <Link to="/login">Login</Link>
    </div>

    </>
  );
}

export default Signup;
