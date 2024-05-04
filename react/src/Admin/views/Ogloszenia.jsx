import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { NavLink } from 'react-router-dom';

export default function Ogloszenia() {
  const [Ogloszenia, setOgloszenia] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [noOgloszenia, setNoOgloszenia] = useState(false);

  useEffect(() => {
    const fetchOgloszenia = async () => {
      try {
        const response = await axiosClient.get('ogloszenia_admin');
        setOgloszenia(response.data.ogloszenia); 
        setLoading(false); 
        setNoOgloszenia(false);
      } catch (error) {
        console.error('Błąd pobierania ogłoszeń:', error);
        setLoading(false);
        setNoOgloszenia(true);
      }
    };

    fetchOgloszenia();
  }, []);

  const handleDeleteOgloszenia = (id) => {
    axiosClient.delete(`ogloszenia/${id}`)
      .then(response => {
        axiosClient.get('ogloszenia_admin')
          .then(response => {
            setOgloszenia(response.data.ogloszenia); // Poprawienie nazwy klucza
          })
          .catch(error => {
            console.error('Błąd pobierania ogloszen:', error);
          });
      })
      .catch(error => {
        console.error('Błąd usuwania ogloszen:', error);
      });
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Ogloszenia</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <section>
            <div className="overflow-x-auto">
              {loading ? (
                <p>Ładowanie...</p>
              ) : noOgloszenia ? (
                <p>Brak ogloszen do wyświetlenia</p>
              ) : (
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Nr Ogloszenia</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Nazwa Ogloszenia</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Opis</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Data nadania</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Stanowiska</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                  {Ogloszenia.map((OgloszeniaItem, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{OgloszeniaItem.Ogloszenia_id}</td>
                      <td className="px-4 py-2">{OgloszeniaItem.tytul}</td>
                      <td className="px-4 py-2">{OgloszeniaItem.opis}</td>
                      <td className="px-4 py-2">{OgloszeniaItem.data_nadania}</td>
                      {/* Wyświetlanie stanowisk przypisanych do ogłoszenia */}
                      <td className="px-4 py-2">
                        {OgloszeniaItem.stanowiska.map((stanowisko, index) => (
                          <span key={index}>{stanowisko.nazwa_stanowiska}, </span>
                        ))}
                      </td>
                      <td className="px-4 py-2">
                        <NavLink
                          to={`/admin/form/editOgloszenia/${OgloszeniaItem.Ogloszenia_id}`}
                          className="text-green-500 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          Edytuj
                        </NavLink>
                        <button
                          onClick={() => handleDeleteOgloszenia(OgloszeniaItem.Ogloszenia_id)}
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
                to="/admin/form/addOgloszenia"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 text-sm font-medium mt-4"
              >
                Dodaj nowe Ogłoszenie
              </NavLink>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
