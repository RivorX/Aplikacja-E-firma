import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function StrefaKartaDostepu_UPDATE() {
  const { id } = useParams();
  const [selectedKarta, setSelectedKarta] = useState(null);
  const [selectedStrefy, setSelectedStrefy] = useState([]);
  const [strefy, setStrefy] = useState([]);
  const [error, setError] = useState({ __html: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setError({ __html: '' });
    // Pobierz dane karty dostępu do edycji
    axiosClient.get(`karty_dostepu/${id}`)
      .then(response => {
        setSelectedKarta(response.data.kartaDostepu);
        // Ustaw wybrane strefy dostępu
        const selectedStrefyIds = response.data.kartaDostepu.strefy_dostepu.map(strefa => strefa.Strefa_Dostepu_id);
        setSelectedStrefy(selectedStrefyIds);
      })
      .catch((error) => {
        console.error('Błąd pobierania karty dostępu:', error);
      });

    // Pobierz strefy dostępu z bazy danych
    axiosClient.get('strefy-dostepu')
      .then(({ data }) => {
        if (Array.isArray(data.strefy)) {
          setStrefy(data.strefy);
        } else {
          console.error('Błąd: Brak stref dostępu w formacie tablicy');
        }
      })
      .catch((error) => {
        console.error('Błąd pobierania stref dostępu:', error);
      });
  }, [id]);

  // Funkcja do zapisywania edycji dostępu do stref dla karty dostępu
  const handleSaveChanges = () => {
    setError({ __html: '' });
    axiosClient
      .put(`karty_dostepu/${id}`, {
        strefy_dostepu: selectedStrefy
      })
      .then(() => {
        navigate('/admin/KartyDostepu');
      })
      .catch((error) => {
        console.error('Błąd edycji dostępu do stref dla karty dostępu:', error);
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Edytuj Dostęp do Stref dla Karty Dostępu
          </h2>
          {/* Wypisywananie błędów z backendu */}
          {error.__html && (
            <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>
            </div>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="selectedKarta" className="block text-sm font-medium leading-6 text-gray-900">
                Karta Dostępu
              </label>
              <div className="mt-2">
                <input
                  id="selectedKarta"
                  name="selectedKarta"
                  type="text"
                  autoComplete="off"
                  value={selectedKarta && selectedKarta.numer_seryjny}
                  readOnly
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="imienazwisko" className="block text-sm font-medium leading-6 text-gray-900">
                Właściciel Karty
              </label>
              <div className="mt-2">
                <input
                  id="imienazwisko"
                  name="imienazwisko"
                  type="text"
                  autoComplete="off"
                  value={selectedKarta && selectedKarta.pracownik.imie + ' ' + selectedKarta.pracownik.nazwisko}
                  readOnly
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            

            <div>
              <label htmlFor="selectedStrefy" className="block text-sm font-medium leading-6 text-gray-900">
                Strefy Dostępu
              </label>
              <div className="mt-2">
                {Array.isArray(strefy) && strefy.map((strefa) => (
                  <div key={strefa.Strefa_Dostepu_id} className="flex items-center">
                    <input
                      id={`strefa-${strefa.Strefa_Dostepu_id}`}
                      type="checkbox"
                      value={strefa.Strefa_Dostepu_id}
                      checked={selectedStrefy.includes(strefa.Strefa_Dostepu_id)}
                      onChange={(e) => {
                        const strefaId = parseInt(e.target.value);
                        setSelectedStrefy(prevStrefy =>
                          prevStrefy.includes(strefaId)
                            ? prevStrefy.filter(id => id !== strefaId)
                            : [...prevStrefy, strefaId]
                        );
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`strefa-${strefa.Strefa_Dostepu_id}`} className="ml-2 text-sm text-gray-700">{strefa.nazwa_strefy}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <Link to="/admin/KartyDostepu" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
                Anuluj
              </Link>
              <button onClick={handleSaveChanges} className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
                Zapisz zmiany
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
