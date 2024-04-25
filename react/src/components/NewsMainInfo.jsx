import React, { useState, useEffect } from 'react';
import axiosClient from '../axios.js';
import { useNavigate, useParams } from 'react-router-dom';

function NewsMainInfo() {
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Aktualności</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guestNewsInfo.length === 0 && (
          <p className="text-gray-500">Brak aktualności.</p>
        )}
        {Array.isArray(guestNewsInfo) && guestNewsInfo.map((newsItem, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{newsItem.tytul}</h2>
              {newsItem.obraz && (
                <img src={newsItem.obraz} alt={newsItem.tytul} className="w-full mb-4 rounded-lg" />
              )}
              <p className="text-gray-700">{newsItem.opis}</p>
              <p className="text-gray-500 mt-4">Dodano: {newsItem.data_nadania}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsMainInfo;
