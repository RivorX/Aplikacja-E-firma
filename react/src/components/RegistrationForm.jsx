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
        console.log('Pobrano dane newsów:', response.data); // Dodaj loga
        setGuestNewsInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching GuestNewsInfo:', error);
      });
  }, []);

  return (
    <div className="container">
      <h2>Newsy na stronie głównej</h2>
      <div className="news-list">
        {guestNewsInfo.length === 0 && (
          <p>Brak aktualności.</p>
        )}
        {Array.isArray(guestNewsInfo) && guestNewsInfo.map((newsItem, index) => (
          <div key={index} className="news-item">
            <h3>{newsItem.tytul}</h3>
            <p>{newsItem.opis}</p>
            <p>Dodano: {newsItem.data_nadania}</p>
              {/* Tutaj możesz sprawdzić, czy istnieje obraz i wyświetlić go, jeśli tak */}
              {newsItem.obraz && <img src={newsItem.obraz} alt={newsItem.tytul} />}
          </div>
        ))}
      </div>
    </div>
  );  
}
