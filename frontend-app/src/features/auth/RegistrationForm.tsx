import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { registerUser } from '../../state/authSlice';

interface RegistrationData {
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { error } = useAppSelector((state) => state.auth);

    const [formData, setFormData] = useState<RegistrationData>({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const resetRegistrationData = () => {
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
        });
        setPasswordsMatch(true);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            setSuccessMessage('');
            if (formData.password !== formData.confirmPassword) {
                setPasswordsMatch(false);
                setLoading(false);
                return;
            }

            setPasswordsMatch(true);
            const response = await dispatch(registerUser(formData));

            if (response.type.indexOf('fulfilled') !== -1) {
                setSuccessMessage('You registered successfully. Please go to the login page.');
                resetRegistrationData();
            }
        } catch (error) {
            console.log('Registration failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderAlert = (variant: string, message: string) => (
        <Alert variant={variant} className="mt-2">
            {message}
        </Alert>
    );

    return (
        <Form onSubmit={handleRegister}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address:</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    isInvalid={!passwordsMatch}
                />
                {!passwordsMatch && renderAlert('danger', 'Passwords do not match.')}
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
                Submit
            </Button>

            {error && renderAlert('danger', error)}
            {successMessage && renderAlert('success', successMessage)}
        </Form>
    );
};

export default RegisterForm;
