import React, { useState, useEffect } from 'react';
import axiosClient from '../axios.js';
import { useStateContext } from '../contexts/ContextProvider';

function Ogloszenia() {
    const { currentUser } = useStateContext();
    const [ogloszenia, setOgloszenia] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        // Funkcja do pobierania ogłoszeń z bazy danych dla konkretnego Pracownik_id
        const fetchOgloszenia = async () => {
            try {
                // Wykonaj żądanie GET do API, które zwraca ogłoszenia dla danego Pracownik_id
                const response = await axiosClient.get(`ogloszenia/${currentUser.Stanowisko_id}`);
                // Ustaw pobrane ogłoszenia w stanie
                setOgloszenia(response.data.Ogloszenia);
                setLoading(false); 
            } catch (error) {
                console.error('Błąd pobierania ogłoszeń:', error);
            }
        };

        // Wywołaj funkcję pobierającą ogłoszenia
        fetchOgloszenia();
    }, [currentUser.Pracownicy_id]); // Dodaj currentUser.Pracownicy_id jako zależność useEffect

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Ogłoszenia</h1>
                </div>
            </header>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <p>Ładowanie...</p>
                    ) : ogloszenia && ogloszenia.length === 0 && (
                        <p className="text-gray-500">Brak Ogłoszeń.</p>
                    )}
                    {Array.isArray(ogloszenia) && ogloszenia.map((ogloszeniaItem, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2">{ogloszeniaItem.tytul}</h2>
                                <p className="text-gray-700">{ogloszeniaItem.opis}</p>
                                <p className="text-gray-500 mt-4">Dodano: {ogloszeniaItem.data_nadania}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Ogloszenia;
