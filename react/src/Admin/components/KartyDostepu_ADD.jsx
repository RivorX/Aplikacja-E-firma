import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { useNavigate, Link } from 'react-router-dom';

export default function KartyDostepu_ADD() {
  const [dataWydania, setDataWydania] = useState('');
  const [dataWaznosci, setDataWaznosci] = useState('');
  const [pracownicy, setPracownicy] = useState([]);
  const [wybranyPracownik, setWybranyPracownik] = useState('');
  const [strefyDostepu, setStrefyDostepu] = useState([]);
  const [wybraneStrefy, setWybraneStrefy] = useState([]);
  const [inneDane, setInneDane] = useState('');
  const [kartaAktywna, setKartaAktywna] = useState(false);
  const [error, setError] = useState({ __html: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employees and access zones when component mounts
    axiosClient.get('pracownicy_admin')
      .then(({ data }) => {
        if (!data.error) {
          setPracownicy(data.pracownicy);
        } else {
          console.error('Błąd pobierania pracowników:', data.message);
        }
      })
      .catch((error) => {
        console.error('Błąd pobierania pracowników:', error);
      });

      axiosClient.get('strefy-dostepu')
      .then(({ data }) => {
        if (!data.error) {
          setStrefyDostepu(data);
        } else {
          console.error('Błąd pobierania stref dostępu:', data.message);
        }
      })
      .catch((error) => {
        console.error('Błąd pobierania stref dostępu:', error);
      });    
  }, []);

  const handleSaveChanges = () => {
    setError({ __html: '' });

    if (!wybranyPracownik) {
      setError({ __html: 'Wybierz pracownika' });
      return;
    }

    if (!dataWydania || !dataWaznosci) {
      setError({ __html: 'Wypełnij datę wydania i datę ważności' });
      return;
    }

    if (wybraneStrefy.length === 0) {
      setError({ __html: 'Wybierz co najmniej jedną strefę dostępu' });
      return;
    }

    axiosClient.post('karty_dostepu', {
      Pracownicy_id: wybranyPracownik,
      data_wydania: dataWydania,
      data_waznosci: dataWaznosci,
      karta_aktywna: kartaAktywna ? 1 : 0,
      inne_dane: inneDane,
      strefy_dostepu_id: wybraneStrefy,
    })
    .then(({ data }) => {
      if (!data.error) {
        navigate('/admin/kartyDostepu');
      } else {
        console.error('Błąd dodawania karty dostępu:', data.message);
      }
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.errors) {
        const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
        setError({ __html: finalErrors.join('<br>') });
      }
    });
  };
  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Dodaj Kartę Dostępu
          </h2>
          {error.__html && (
            <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="wybranyPracownik" className="block text-sm font-medium leading-6 text-gray-900">
                Wybierz Pracownika
              </label>
              <div className="mt-2">
                <select
                  id="wybranyPracownik"
                  name="wybranyPracownik"
                  required
                  value={wybranyPracownik}
                  onChange={(e) => setWybranyPracownik(e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Wybierz pracownika...</option>
                  {pracownicy.map((pracownik) => (
                    <option key={pracownik.Pracownicy_id} value={pracownik.Pracownicy_id}>{pracownik.imie} {pracownik.nazwisko}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="dataWydania" className="block text-sm font-medium leading-6 text-gray-900">
                Data Wydania
              </label>
              <div className="mt-2">
                <input
                  id="dataWydania"
                  name="dataWydania"
                  type="date"
                  required
                  value={dataWydania}
                  onChange={(e) => setDataWydania(e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="dataWaznosci" className="block text-sm font-medium leading-6 text-gray-900">
                Data Ważności
              </label>
              <div className="mt-2">
                <input
                  id="dataWaznosci"
                  name="dataWaznosci"
                  type="date"
                  required
                  value={dataWaznosci}
                  onChange={(e) => setDataWaznosci(e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="inneDane" className="block text-sm font-medium leading-6 text-gray-900">
                Dodatkowe Dane
              </label>
              <div className="mt-2">
                <input
                  id="inneDane"
                  name="inneDane"
                  type="text"
                  value={inneDane}
                  onChange={(e) => setInneDane(e.target.value)}
                  className="block w-full rounded-md border-2 border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="kartaAktywna" className="block text-sm font-medium leading-6 text-gray-900">
                Karta aktywna
              </label>
              <div className="mt-2">
                <select
                  id="kartaAktywna"
                  name="kartaAktywna"
                  required
                  value={kartaAktywna}
                  onChange={(e) => setKartaAktywna(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="1">Tak</option>
                  <option value="0">Nie</option>
                </select>
              </div>
            </div>

            <div>
                <label htmlFor="wybraneStrefy" className="block text-sm font-medium leading-6 text-gray-900">
                    Wybierz Strefy Dostępu
                </label>
                <div className="mt-2">
                    {Array.isArray(strefyDostepu) && strefyDostepu.map((strefa) => (
                        <div key={strefa.Strefy_Dostepu_id} className="flex items-center">
                            <input
                                id={`strefa-${strefa.Strefy_Dostepu_id}`}
                                name={`strefa-${strefa.Strefy_Dostepu_id}`}
                                type="checkbox"
                                value={strefa.Strefy_Dostepu_id}
                                checked={wybraneStrefy.includes(strefa.Strefy_Dostepu_id)}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setWybraneStrefy((prevStrefy) => {
                                        if (checked) {
                                            return [...prevStrefy, strefa.Strefy_Dostepu_id];
                                        } else {
                                            return prevStrefy.filter((id) => id !== strefa.Strefy_Dostepu_id);
                                        }
                                    });
                                }}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`strefa-${strefa.Strefy_Dostepu_id}`} className="ml-2 block text-sm text-gray-900">
                                {strefa.nazwa_strefy}
                            </label>
                        </div>
                    ))}
                </div>
            </div>


            <div className="flex justify-end">
              <Link to="/admin/kartyDostepu" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Anuluj
              </Link>
              <button
                type="button"
                onClick={handleSaveChanges}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Zapisz
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
