import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../../Contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e) {
      e.preventDefault()

    try {
        setLoading(true)
        setError('');
        await login(emailRef.current.value, passwordRef.current.value);
        history.push("/")
    } catch(err) {
        setError("failed to login")
    }
    setLoading(false)
  }

  
  return (
    <div className="auth">
    <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
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
                <Button disable={loading} type="submit" className="w-100">Log In</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className="w-100 text-center mt-3">
        <Link to="forgot">Forgot Password?</Link>
    </div>
    <div className="auth-bottom">
        Need an account? <Link preventDefault to="/signup">Sign Up</Link>
    </div>
  

    </div>
  );
}

export default Login;
