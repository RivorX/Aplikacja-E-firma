import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { useStateContext } from '../../contexts/ContextProvider';
import { NavLink } from 'react-router-dom';

export default function Pracownicy() {
  const [pracownicy, setPracownicy] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Pobierz pracowników z bazy danych
    axiosClient.get('pracownicy_admin')
      .then(response => {
        setPracownicy(response.data.pracownicy);
        setLoading(false); 
      })
      .catch(error => {
        console.error('Błąd pobierania pracowników:', error);
      });
  }, []);
  const handleDeletePracownik = (id) => {
    axiosClient.delete(`pracownicy/${id}`)
      .then(response => {
        axiosClient.get('pracownicy')
          .then(response => {
            setPracownicy(response.data.pracownicy);
          })
          .catch(error => {
            console.error('Błąd pobierania pracowników:', error);
          });
      })
      .catch(error => {
        console.error('Błąd usuwania pracownika:', error);
      });
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Lista pracowników</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 px-2 sm:px-4 lg:px-4">
          <section>
            <div className="overflow-x-auto">
            {loading ? (
                <p>Ładowanie...</p>
              ) : pracownicy.length === 0 ? (
                <p>Brak pracowników do wyświetlenia</p>
              ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Imię</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Nazwisko</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Email</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Numer seryjny</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Status konta</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {pracownicy.map((pracownik, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{pracownik.imie}</td>
                      <td className="px-4 py-2">{pracownik.nazwisko}</td>
                      <td className="px-4 py-2">{pracownik.email}</td>
                      <td className="px-4 py-2">{pracownik.numer_seryjny}</td>
                      <td className={`border px-4 py-2 ${pracownik.konto_aktywne ? 'text-green-500' : 'text-red-500'}`}>
                          {pracownik.konto_aktywne ? 'Aktywne' : 'Zablokowane'}
                        </td>
                      <td className="px-4 py-2">
                      <NavLink
                          to={`/admin/editPracownik/${pracownik.id}`}
                          className="text-green-500 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          Edytuj Pracownika
                        </NavLink>
                        <NavLink
                          to={`/admin/editPracownik/${pracownik.id}`}
                          className="text-green-500 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          Edytuj Kartę
                        </NavLink>
                        <button
                          onClick={() => handleDeletePracownik(pracownik.id)}
                          className="text-red-500 hover:bg-red-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          Usuń
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
                to="/admin/form/addUser"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 text-sm font-medium mt-4"
              >
                Dodaj nowego użytkownika
              </NavLink>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}