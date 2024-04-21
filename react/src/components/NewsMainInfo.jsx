import React, { useState, useEffect } from 'react';
import axiosClient from '../axios.js';
import { useNavigate, useParams } from 'react-router-dom';

export default function NewsMainInfo() {
  const [guestNewsInfo, setGuestNewsInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Pobierz wiadomości z bazy danych przy załadowaniu komponentu
    axiosClient
      .get('GuestNewsInfo')
      .then(response => {
        setGuestNewsInfo(response.data.NewsInfo);
      })
      .catch(error => {
        console.error('Error fetching GuestNewsInfo:', error);
      });
  }, []);

  return (
    <div className="container py-4">
      <div className="news-list">
        {guestNewsInfo.length === 0 && (
          <p>Brak aktualności.</p>
        )}
        {Array.isArray(guestNewsInfo) && guestNewsInfo.map((newsItem, index) => (
          <div key={index} className="news-item mb-4">
            <div className="news-item-header">
              <h1>{newsItem.tytul}</h1>
              {newsItem.obraz && (
                <img src={newsItem.obraz} alt={newsItem.tytul} className="img-fluid" />
              )}
            </div>
            <div className="news-item-content">
              <p>{newsItem.opis}</p>
              <p>Dodano: {newsItem.data_nadania}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
