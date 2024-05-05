import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { NavLink } from 'react-router-dom';

export default function PrzegladDrzwiKodyQR() {
  const [drzwiKodyQR, setDrzwiKodyQR] = useState([]);

  useEffect(() => {
    fetchDrzwis();
  }, []);

  const fetchDrzwis = async () => {
    try {
      const response = await axiosClient.get('drzwi'); 
      setDrzwiKodyQR(response.data);
    } catch (error) {
      console.error('Błąd pobierania drzwi/kodów QR:', error);
    }
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Przegląd Drzwi / Kody QR</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <section>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Nr wejścia</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Nazwa</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">We/Wy</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Strefa wymagana</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Drzwi aktywne</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Ostatnia zmiana kodu</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Drukuj</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Edytuj</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Usuń</th>
                  </tr>
                </thead>
                <tbody>
                  {drzwiKodyQR.map((element, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{element?.nr_drzwi || '-'}</td>
                      <td className="px-4 py-2">{element?.nazwa || '-'}</td>
                      <td className="px-4 py-2">{element?.WeWy || '-'}</td>
                      <td className="px-4 py-2">{element?.strefy_dostepu?.nazwa_strefy || '-'}</td>
                      <td className="px-4 py-2">{element?.drzwi_aktywne ? 'Tak' : 'Nie'}</td>
                      <td className="px-4 py-2">{element?.ostatnia_zmiana_kodu || '-'}</td>
                      <td className="px-4 py-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Drukuj
                        </button>
                      </td>
                      <td className="px-4 py-2">
                        <NavLink
                          to={`/admin/form/editKodyQR/${element.Drzwi_id}`}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Edytuj
                        </NavLink>
                        </td>
                      <td className="px-4 py-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Usuń
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <NavLink
                to="/admin/form/addKodyQR"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 text-sm font-medium mt-4"
              >
                Dodaj nowe drzwi
              </NavLink>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
