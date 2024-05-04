import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { NavLink } from 'react-router-dom';

export default function KartyDostepu() {
  const [karty, setKarty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noKarty, setNoKarty] = useState(false);

  useEffect(() => {
    const fetchKarty = async () => {
      try {
        const response = await axiosClient.get('karty_dostepu_admin');
        const kartyData = response.data.kartyDostepu || [];
        setKarty(kartyData);
        setLoading(false);
        if (kartyData.length === 0) {
          setNoKarty(true);
        }
      } catch (error) {
        console.error('Błąd pobierania kart dostępu:', error);
        setLoading(false);
        setNoKarty(true);
        setKarty([]);
      }
    };
    fetchKarty();
  }, []);

  const handleDeleteKarta = (id) => {
    axiosClient
      .delete(`karty_dostepu/${id}`)
      .then((response) => {
        axiosClient
          .get('karty_dostepu_admin')
          .then((response) => {
            setKarty(response.data);
          })
          .catch((error) => {
            console.error('Błąd pobierania kart dostępu:', error);
          });
      })
      .catch((error) => {
        console.error('Błąd usuwania karty dostępu:', error);
      });
  };

  const handleChangeStatus = async (id) => {
    try {
      const response = await axiosClient.put(`karty_dostepu/${id}/change-status`);
      const updatedKarty = karty.map((karta) => {
        if (karta.Karta_Dostepu_id === id) {
          return { ...karta, karta_aktywna: !karta.karta_aktywna }; 
        }
        return karta;
      });
      setKarty(updatedKarty);
    } catch (error) {
      console.error('Błąd zmiany statusu karty dostępu:', error);
    }
  };  
  

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Lista pracowników z kartami dostępu</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <section>
            <div className="overflow-x-auto">
              {loading ? (
                <p>Ładowanie...</p>
              ) : noKarty ? (
                <p>Brak kart do wyświetlenia</p>
              ) : (
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Nr karty</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Data wydania</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Data ważności</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Imię</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Nazwisko</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Status</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {karty.map((karta) => (
                      <tr key={karta.Karta_Dostepu_id}>
                        <td className="border px-4 py-2 text-gray-700">{karta.numer_seryjny}</td>
                        <td className="border px-4 py-2 text-gray-700">{karta.data_wydania}</td>
                        <td className="border px-4 py-2 text-gray-700">{karta.data_waznosci}</td>
                        <td className="border px-4 py-2 text-gray-700">{karta.pracownik.imie}</td>
                        <td className="border px-4 py-2 text-gray-700">{karta.pracownik.nazwisko}</td>
                        <td className="border px-4 py-2 text-gray-700">{karta.karta_aktywna ? 'Aktywna' : 'Zablokowana'}</td>
                        <td className="border px-4 py-2 text-gray-700">
                          <button
                            onClick={() => handleChangeStatus(karta.Karta_Dostepu_id)}
                            className={`hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
                              karta.karta_aktywna ? 'text-green-500 hover:bg-gray-700' : 'text-red-500 hover:bg-red-700'
                            }`}
                          >
                            {karta.karta_aktywna ? 'Zablokuj' : 'Odblokuj'}
                          </button>

                          <NavLink
                            to={`/karty-dostepu/${karta.Karta_Dostepu_id}/edytuj`}
                            className="text-green-500 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          >
                            Edytuj
                          </NavLink>
                          <button
                            onClick={() => handleDeleteKarta(karta.Karta_Dostepu_id)}
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
          </section>
        </div>
      </main>
    </>
  );
}
