import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';

export default function PrzegladDrzwiKodyQR() {
  const [drzwiKodyQR, setDrzwiKodyQR] = useState([]);

  useEffect(() => {
    // Pobierz drzwi/kody QR z bazy danych
    axiosClient.get('drzwi-kody-qr')
      .then(response => {
        setDrzwiKodyQR(response.data);
      })
      .catch(error => {
        console.error('Błąd pobierania drzwi/kodów QR:', error);
      });
  }, []);

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
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Ostatnia zmiana kodu</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Kod QR</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Edytuj</th>
                  </tr>
                </thead>
                <tbody>
                  {drzwiKodyQR.map((element, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{element.nr_wejscia}</td>
                      <td className="px-4 py-2">{element.nazwa}</td>
                      <td className="px-4 py-2">{element.we_wy}</td>
                      <td className="px-4 py-2">{element.strefa_wymagana}</td>
                      <td className="px-4 py-2">{element.ostatnia_zmiana_kodu}</td>
                      <td className="px-4 py-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Drukuj
                        </button>
                      </td>
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
