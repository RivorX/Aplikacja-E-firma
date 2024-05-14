import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { useNavigate, Link } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';

export default function StrefyDostępu_ADD() {
  const { currentUser } = useStateContext();
  const [nazwaStrefy, setNazwaStrefy] = useState("");
  const [budynekId, setBudynekId] = useState("");
  const [budynki, setBudynki] = useState([]);
  
  const [error, setError] = useState({ __html: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setError({ __html: '' });
    // Pobierz budynki z bazy danych i ustaw je w stanie komponentu
    axiosClient.get('budynki')
      .then(({ data }) => {
        if (Array.isArray(data)) {
          setBudynki(data);
        } else {
          console.error('Błąd: Brak budynków w formacie tablicy');
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
          setError({ __html: finalErrors.join('<br>') }); // Aktualizacja stanu error
        }
      });
  }, []);

  const handleSaveChanges = () => {
    setError({ __html: '' });
    axiosClient.post('strefy-dostepu', {
      nazwa_strefy: nazwaStrefy,
      budynek_id: budynekId,
    })
    .then(({ data }) => {
      console.log(data);
      // Sprawdzamy, czy nie ma błędów w odpowiedzi z serwera
      if (!data.error) {
        navigate('/admin/StrefyDostepu');
      } else {
        console.error('Błąd dodawania strefy dostępu:', data.message);
      }
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.errors) {
        const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
        setError({ __html: finalErrors.join('<br>') }); // Aktualizacja stanu error
      }
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Dodaj Strefę Dostępu
          </h2>
          {/* Wypisywanie błędów z backendu */}
          {error.__html && (
            <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>
            </div>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="nazwaStrefy" className="block text-sm font-medium leading-6 text-gray-900">
                Nazwa Strefy
              </label>
              <div className="mt-2">
                <input
                  id="nazwaStrefy"
                  name="nazwaStrefy"
                  type="text"
                  autoComplete="off"
                  required
                  value={nazwaStrefy}
                  onChange={(e) => setNazwaStrefy(e.target.value)}
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
                  value={budynekId}
                  onChange={(e) => setBudynekId(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Wybierz budynek</option>
                  {Array.isArray(budynki) && budynki.map((budynek) => (
                    <option key={budynek.budynek_id} value={budynek.budynek_id}>
                      {budynek.nazwa_budynku}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <Link to="/admin/StrefyDostepu" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
                Anuluj
              </Link>

              <button type="button" onClick={handleSaveChanges} className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
                Dodaj Strefę Dostępu
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
