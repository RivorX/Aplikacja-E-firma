import React, { useState, useEffect } from 'react';
import axiosClient from '../axios.js';
import { useNavigate, useParams } from "react-router-dom";

export default function NewsMainInfo() {
    const [guestNewsInfo, setGuestNewsInfo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Pobierz wiadomości z bazy danych przy załadowaniu komponentu
        axiosClient
            .get('GuestNewsInfo')
            .then(response => {
                setGuestNewsInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching GuestNewsInfo:', error);
            });
    }, []);

    return (
        <div className="container">
            <h2>Newsy na stronie głównej</h2>
            <ul className="news-list">
                {Array.isArray(guestNewsInfo) && guestNewsInfo.map((newsItem, index) => (
                    <li key={index} className="news-item">
                        {/* Wyświetl tutaj odpowiednie dane dla każdej wiadomości */}
                        {newsItem.tytul}
                        {newsItem.opis}
                        {/* Tutaj można dodać więcej pól, takich jak data, autor, itp. */}
                    </li>
                ))}
            </ul>
        </div>
    );    
}
