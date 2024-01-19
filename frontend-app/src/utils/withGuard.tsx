import React from 'react';
import { useNavigate } from 'react-router-dom';

const withGuard = (Component: React.ComponentType) => {
    const Wrapper: React.FC = (props) => {
        const accessToken = localStorage.getItem('access_token');
        const navigate = useNavigate();
        if (accessToken) {
            // If the access token is present, render the original component with its props
            return <Component {...props} />;
        } else {
            // If the user is not logged in, navigate to the login page
            navigate('/login');
            return null; // 
        }
    };

    return Wrapper;
};

export default withGuard;
