import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Budynek_UPDATE() {
  const { id } = useParams();
  const [nazwa, setNazwa] = useState('');
  const [opis, setOpis] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get(`budynki/${id}`)
      .then(({ data }) => {
        setNazwa(data.nazwa_budynku);
        setOpis(data.opis_budynku);
      })
      .catch((error) => {
        console.error('Błąd wczytywania budynku:', error);
        setError('Wystąpił błąd podczas wczytywania budynku. Spróbuj ponownie później.');
      });
  }, [id]);

  const handleSaveChanges = () => {
    setError(null);

    if (!nazwa) {
      setError('Wypełnij pole z nazwą budynku');
      return;
    }

    axiosClient.put(`budynki/${id}`, {
      nazwa_budynku: nazwa,
      opis_budynku: opis
    })
    .then(({ status }) => {
      if (status === 200) {
        navigate('/admin/Budynki');
      }
    })
    .catch((error) => {
      console.error('Błąd aktualizacji budynku:', error);
      setError('Wystąpił błąd podczas aktualizacji budynku. Spróbuj ponownie później.');
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Edytuj Budynek
        </h2>
        {error && (
          <div className="bg-red-500 rounded py-2 px-3 text-white">{error}</div>
        )}
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label htmlFor="nazwa" className="block text-sm font-medium leading-6 text-gray-900">
              Nazwa Budynku
            </label>
            <div className="mt-2">
              <input
                id="nazwa"
                name="nazwa"
                type="text"
                value={nazwa}
                onChange={(e) => setNazwa(e.target.value)}
                className="block w-full rounded-md border-2 border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="opis" className="block text-sm font-medium leading-6 text-gray-900">
              Opis
            </label>
            <div className="mt-2">
              <textarea
                id="opis"
                name="opis"
                value={opis}
                onChange={(e) => setOpis(e.target.value)}
                className="block w-full rounded-md border-2 border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Zapisz
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/Budynki')}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
