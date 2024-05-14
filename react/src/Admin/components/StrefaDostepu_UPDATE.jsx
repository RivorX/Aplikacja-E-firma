import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StrefaDostepu_UPDATE = ({ id }) => {
  const [nazwaStrefy, setNazwaStrefy] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Pobieranie danych strefy dostępu o podanym ID
    axios.get(`/api/strefy_dostepu/${id}`)
      .then(response => {
        const { nazwa_strefy } = response.data;
        setNazwaStrefy(nazwa_strefy);
        setIsLoading(false);
      })
      .catch(error => {
        setError('Wystąpił błąd podczas pobierania danych.');
        setIsLoading(false);
      });
  }, [id]);

  const handleInputChange = e => {
    setNazwaStrefy(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Aktualizacja danych strefy dostępu
    axios.put(`/api/strefy_dostepu/${id}`, { nazwa_strefy })
      .then(response => {
        console.log('Dane strefy dostępu zostały zaktualizowane.');
      })
      .catch(error => {
        console.error('Wystąpił błąd podczas aktualizacji danych.');
      });
  };

  if (isLoading) {
    return <p>Ładowanie...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nazwa Strefy:
        <input
          type="text"
          value={nazwaStrefy}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Zaktualizuj</button>
    </form>
  );
};

export default StrefaDostepu_UPDATE;
