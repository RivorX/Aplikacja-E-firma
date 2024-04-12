import React from 'react';

export default function ApplicationLogo(props) {
    return (
        <img 
            src="/logo.jpg" 
            alt="Logo" 
            className="img-fluid rounded-circle"
            style={{ maxWidth: "100px" }} 
        />
    );
}
