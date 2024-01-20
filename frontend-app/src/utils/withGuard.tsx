import React from 'react';

const withGuard = (Component: React.ComponentType) => {
    const Wrapper: React.FC = (props) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            // If the access token is present, render the original component with its props
            return <Component {...props} />;
        } else {
            return (
                <div className="mt-5 text-center">
                    <p>Please go to login page and log in first </p>
                </div>)

        }
    };

    return Wrapper;
};

export default withGuard;
