import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const StrefaDostepu_UPDATE = () => {
  const { id } = useParams();
  const [nazwaStrefy, setNazwaStrefy] = useState('');
  const [budynek, setBudynek] = useState('');
  const [budynki, setBudynki] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Pobieranie danych strefy dostępu o podanym ID
    axiosClient.get(`strefy-dostepu/${id}`)
      .then(response => {
        const { nazwa_strefy, budynek_id } = response.data;
        setNazwaStrefy(nazwa_strefy);
        setBudynek(budynek_id);
        setIsLoading(false);
      })
      .catch(error => {
        setError('Wystąpił błąd podczas pobierania danych.');
        setIsLoading(false);
      });

    // Pobieranie listy budynków
    axiosClient.get(`budynki`)
      .then(response => {
        setBudynki(response.data);
      })
      .catch(error => {
        setError('Wystąpił błąd podczas pobierania listy budynków.');
      });
  }, [id]);

  const handleInputChange = e => {
    setNazwaStrefy(e.target.value);
  };

  const handleBudynekChange = e => {
    setBudynek(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Aktualizacja danych strefy dostępu
    axiosClient.put(`strefy-dostepu/${id}`, { nazwa_strefy: nazwaStrefy, budynek_id: budynek })
      .then(response => {
        console.log('Dane strefy dostępu zostały zaktualizowane.');
        navigate('/admin/StrefyDostepu');
      })
      .catch(error => {
        console.error('Wystąpił błąd podczas aktualizacji danych.');
        setError('Wystąpił błąd podczas aktualizacji danych.');
      });
  };

  if (isLoading) {
    return <p>Ładowanie...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Edytuj Strefę Dostępu
        </h2>
        {error && (
          <div className="bg-red-500 rounded py-2 px-3 text-white">
            {error}
          </div>
        )}
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nazwaStrefy" className="block text-sm font-medium leading-6 text-gray-900">
              Nazwa Strefy
            </label>
            <div className="mt-2">
              <input
                id="nazwaStrefy"
                name="nazwaStrefy"
                type="text"
                required
                value={nazwaStrefy}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="budynek" className="block text-sm font-medium leading-6 text-gray-900">
              Budynek
            </label>
            <div className="mt-2">
              <select
                id="budynek"
                name="budynek"
                required
                value={budynek}
                onChange={handleBudynekChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Wybierz budynek</option>
                {budynki.map((budynek) => (
                  <option key={budynek.budynek_id} value={budynek.budynek_id}>{budynek.nazwa_budynku}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <Link to="/admin/StrefyDostepu" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
              Anuluj
            </Link>

            <button type="submit" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
              Zaktualizuj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StrefaDostepu_UPDATE;
