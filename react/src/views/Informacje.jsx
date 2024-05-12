import React, { useState, useEffect } from 'react';
import axiosClient from '../axios';

export default function Informacje() {
  const [adresyZamieszkania, setAdresyZamieszkania] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdresyZamieszkania = async () => {
      try {
        const { data: userData } = await axiosClient.get('/me');
        const userId = userData.Pracownicy_id;

        const { data } = await axiosClient.get(`/adresy-zamieszkania/${userId}/pracownik`);
        setAdresyZamieszkania(data.adresZamieszkania || []);
        setLoading(false);
      } catch (error) {
        console.error('Błąd pobierania adresów zamieszkania:', error);
        setLoading(false);
        setAdresyZamieszkania([]);
      }
    };

    fetchAdresyZamieszkania();
  }, []);

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Informacje</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <section>
            <div className="overflow-x-auto">
              {loading ? (
                <p>Ładowanie...</p>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Aktualne adresy zamieszkania:</h2>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nr</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data dodania adresu</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miasto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ulica</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nr domu</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kod pocztowy</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {adresyZamieszkania.map((adres, index) => (
                        <tr key={adres.Adres_Zamieszkania_id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{adres.data_dodania}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{adres.miasto}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{adres.ulica}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{adres.nr_domu}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{adres.kod_pocztowy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
