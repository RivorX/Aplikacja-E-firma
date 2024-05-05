import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Drzwi_ADD() {
  const [nrDrzwi, setNrDrzwi] = useState("");
  const [nazwa, setNazwa] = useState("");
  const [weWy, setWeWy] = useState("");
  const [strefaDostepu, setStrefaDostepu] = useState("");
  const [drzwiAktywne, setDrzwiAktywne] = useState(0);
  const [strefyDostepu, setStrefyDostepu] = useState([]);
  const [error, setError] = useState({ __html: "" });
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchStrefyDostepu();
  }, []);
  
  const fetchStrefyDostepu = async () => {
    try {
      const response = await axiosClient.get('strefy-dostepu');
      setStrefyDostepu(response.data);
    } catch (error) {
      console.error('Błąd pobierania stref dostępu:', error);
      setStrefyDostepu([]); // Ustaw pustą tablicę, jeśli wystąpi błąd
    }
  };
  

  const handleSaveChanges = () => {
    if (!nrDrzwi || !nazwa || !weWy || !strefaDostepu) {
      setError({ __html: "Wszystkie pola są wymagane" });
      return;
    }

    axiosClient.post('drzwi', {
      nr_drzwi: nrDrzwi,
      nazwa: nazwa,
      WeWy: weWy,
      Strefy_Dostepu_id: strefaDostepu,
      drzwi_aktywne: drzwiAktywne
    })
    .then(({ data }) => {
      console.log(data);
      navigate('/admin/kodyQR');
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
            Dodaj Drzwi
          </h2>
          {error.__html && (
            <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="nrDrzwi" className="block text-sm font-medium leading-6 text-gray-900">
                Nr Drzwi
              </label>
              <div className="mt-2">
                <input
                  id="nrDrzwi"
                  name="nrDrzwi"
                  type="text"
                  autoComplete="off"
                  required
                  value={nrDrzwi}
                  onChange={(e) => setNrDrzwi(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="nazwa" className="block text-sm font-medium leading-6 text-gray-900">
                Nazwa
              </label>
              <div className="mt-2">
                <input
                  id="nazwa"
                  name="nazwa"
                  type="text"
                  autoComplete="off"
                  required
                  value={nazwa}
                  onChange={(e) => setNazwa(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="weWy" className="block text-sm font-medium leading-6 text-gray-900">
                We/Wy
              </label>
              <div className="mt-2">
                <input
                  id="weWy"
                  name="weWy"
                  type="text"
                  autoComplete="off"
                  required
                  value={weWy}
                  onChange={(e) => setWeWy(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

                      <div>
            <label htmlFor="strefaDostepu" className="block text-sm font-medium leading-6 text-gray-900">
              Strefa Dostępu
            </label>
            <div className="mt-2">
            <select
              id="strefaDostepu"
              name="strefaDostepu"
              required
              value={strefaDostepu}
              onChange={(e) => setStrefaDostepu(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Wybierz strefę dostępu</option>
              {strefyDostepu.length > 0 &&
                strefyDostepu.map((strefa) => (
                  <option key={strefa.Strefy_Dostepu_id} value={strefa.Strefy_Dostepu_id}>{strefa.nazwa_strefy}</option>
                ))}
            </select>

            </div>
          </div>


            <div>
              <label htmlFor="drzwiAktywne" className="block text-sm font-medium leading-6 text-gray-900">
                Drzwi aktywne
              </label>
              <div className="mt-2">
                <select
                  id="drzwiAktywne"
                  name="drzwiAktywne"
                  required
                  value={drzwiAktywne}
                  onChange={(e) => setDrzwiAktywne(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="1">Tak</option>
                  <option value="0">Nie</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <Link to="/admin/kodyQR" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
                Anuluj
              </Link>

              <Link onClick={handleSaveChanges} className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
                Dodaj Drzwi
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
