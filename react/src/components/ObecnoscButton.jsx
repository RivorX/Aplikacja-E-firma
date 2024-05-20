import React, { useState } from 'react';
import axios from '../axios';

const ObecnoscButton = ({ userId }) => {
    const [status, setStatus] = useState('start');


    const handleClick = async () => {
        try {
            

            if (status === 'start') {
                await axios.post('obecnosc', {
                    Pracownicy_id: userId,
                    data: new Date().toISOString().slice(0, 19).replace('T', ' '),
                    wejscie: new Date().toISOString().slice(0, 19).replace('T', ' ')
                }, config);
                setStatus('stop');
            } else {
                await axios.put(`obecnosc/${userId}`, {
                    Pracownicy_id: userId,
                    wyjscie: new Date().toISOString().slice(0, 19).replace('T', ' ')
                }, config);
                setStatus('start');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`btn ${status === 'start' ? 'btn-success' : 'btn-danger'} btn-lg`}
        >
            {status === 'start' ? 'Zgłoś obecność' : 'Koniec pracy'}
        </button>
    );
};

export default ObecnoscButton;
