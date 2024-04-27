import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { NavLink } from 'react-router-dom';

export default function Aktualnosci() {
  const [aktualnosci, setAktualnosci] = useState([]);
  const [loading, setLoading] = useState(true); // Dodajemy stan do śledzenia ładowania

  useEffect(() => {
    // Pobierz aktualności z bazy danych
    axiosClient.get('aktualnosci_admin')
      .then(response => {
        setAktualnosci(response.data.news);
        setLoading(false); // Ustawiamy loading na false po pobraniu danych
      })
      .catch(error => {
        console.error('Błąd pobierania aktualności:', error);
        setLoading(false); // Ustawiamy loading na false w przypadku błędu
      });
  }, []);

  const handleDelete = (id) => {
    axiosClient.delete(`aktualnosci/${id}`)
      .then(response => {
        // Po udanym usunięciu, pobierz ponownie aktualności
        axiosClient.get('aktualnosci_admin')
          .then(response => {
            setAktualnosci(response.data.news);
          })
          .catch(error => {
            console.error('Błąd pobierania aktualności:', error);
          });
      })
      .catch(error => {
        console.error('Błąd usuwania aktualności:', error);
      });
  };

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
              {loading ? (
                <p>Ładowanie...</p>
              ) : aktualnosci.length === 0 ? ( // Sprawdzamy, czy lista aktualności jest pusta
                <p>Brak aktualności do wyświetlenia</p>
              ) : (
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Nr aktualności</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Nazwa aktualności</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Opis</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Data nadania</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aktualnosci.map((aktualnosciItem, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{aktualnosciItem.Aktualnosci_id}</td>
                        <td className="px-4 py-2">{aktualnosciItem.tytul}</td>
                        <td className="px-4 py-2">{aktualnosciItem.opis}</td>
                        <td className="px-4 py-2">{aktualnosciItem.data_nadania}</td>
                        <td className="px-4 py-2">
                          <NavLink
                            to={`/admin/form/editnews/${aktualnosciItem.Aktualnosci_id}`}
                            className="text-green-500 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          >
                            Edytuj
                          </NavLink>
                          <button
                            onClick={() => handleDelete(aktualnosciItem.Aktualnosci_id)}
                            className="text-red-500 hover:bg-red-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          >
                            Usun
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div>
              <NavLink
                to="/admin/form/addnews"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 text-sm font-medium mt-4"
              >
                Dodaj nową aktualność
              </NavLink>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
