import React, { useState, useEffect } from 'react';
import axiosClient from '../axios.js';
import { useNavigate, useParams } from 'react-router-dom';

function Ogłoszenia() {
    // Stan przechowujący ogłoszenia
    const [ogłoszenia, setOgłoszenia] = useState([]);

    useEffect(() => {
         // Funkcja do pobierania ogłoszeń z bazy danych
         const fetchOgłoszenia = async () => {
            try {
                // Wykonaj żądanie GET do API, które zwraca ogłoszenia
                const response = await axiosClient.get('ogłoszenia');
                // Ustaw pobrane ogłoszenia w stanie
                setOgłoszenia(response.data.ogłoszenia);
            } catch (error) {
                console.error('Błąd pobierania ogłoszeń:', error);
            }
        };

        // Wywołaj funkcję pobierającą ogłoszenia
        fetchOgłoszenia();
      }, []);
    

      return (
        <div className="container mx-auto px-4 py-8">
          <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Ogłoszenia</h1>
                </div>
            </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ogłoszenia.length === 0 && (
              <p className="text-gray-500">Brak Ogłoszeń.</p>
            )}
            {Array.isArray(ogłoszenia) && ogłoszenia.map((ogloszeniaItem, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{ogloszeniaItem.nazwa_ogloszenia}</h2>
                  <p className="text-gray-700">{ogloszeniaItem.opis_ogloszenia}</p>
                  <p className="text-gray-500 mt-4">Dodano: {ogloszeniaItem.data_nadania}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
}
export default Ogłoszenia;
