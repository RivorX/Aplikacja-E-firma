import React, { useState } from 'react';
import axiosClient from '../../axios';
import { useNavigate } from 'react-router-dom';

export default function Budynek_ADD() {
  const [nazwa, setNazwa] = useState('');
  const [opis, setOpis] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSaveChanges = () => {
    setError(null);

    if (!nazwa) {
      setError('Wypełnij pole z nazwą budynku');
      return;
    }

    axiosClient.post('budynki', {
      nazwa_budynku: nazwa,
      opis_budynku: opis
    })
    .then(({ status }) => {
      if (status === 201) {
        navigate('/admin/Budynki');
      }
    })
    .catch((error) => {
      console.error('Błąd dodawania budynku:', error);
      setError('Wystąpił błąd podczas dodawania budynku. Spróbuj ponownie później.');
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Dodaj Nowy Budynek
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
