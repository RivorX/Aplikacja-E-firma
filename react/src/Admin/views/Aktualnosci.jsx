import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';

export default function Aktualnosci() {
  const [aktualnosci, setAktualnosci] = useState([]);

  useEffect(() => {
    // Pobierz aktualności z bazy danych
    axiosClient.get('aktualnosci')
      .then(response => {
        setAktualnosci(response.data);
      })
      .catch(error => {
        console.error('Błąd pobierania aktualności:', error);
      });
  }, []);

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Aktualności</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <section>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Nr aktualności</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Nazwa aktualności</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Opis</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Obraz</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Data dodania</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {aktualnosci.map((aktualnosc, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{aktualnosc.id}</td>
                      <td className="px-4 py-2">{aktualnosc.nazwa}</td>
                      <td className="px-4 py-2">{aktualnosc.opis}</td>
                      <td className="px-4 py-2">{aktualnosc.obraz}</td>
                      <td className="px-4 py-2">{aktualnosc.data_dodania}</td>
                      <td className="px-4 py-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Edytuj
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
