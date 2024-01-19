import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { loginUser } from '../../state/authSlice';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { error } = useAppSelector((state) => state.auth);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const response = await dispatch(loginUser({ email, password }));
            if (response.type.indexOf("fulfilled") !== -1) {
                navigate('/')
            }
        } catch (error) {
            console.log('Login failed:', error);
        }
    };

    return (
        <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address:</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
            </Button>
            {error && (
                <Alert variant="danger" className="mt-2">
                    {error}
                </Alert>
            )}
        </Form>
    );
};

export default LoginForm;
