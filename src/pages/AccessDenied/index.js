import React from 'react';
import { Link } from 'react-router-dom';

const AccessDeniedPage = () => {
    return (
        <div>
            <h1>Access Denied</h1>
            <p>You do not have permission to view this page.</p>
            <p><Link to="/">Go back to Home</Link></p>
        </div>
    );
};

export default AccessDeniedPage;