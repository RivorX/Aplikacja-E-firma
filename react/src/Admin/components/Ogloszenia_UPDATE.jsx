import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function Ogloszenia_UPDATE() {
  const { id } = useParams();
  const [selectedOgloszenie, setSelectedOgloszenie] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [positions, setPositions] = useState([]);

  const [error, setError] = useState({ __html: "" });
  const navigate = useNavigate(); 

  useEffect(() => {
    setError({ __html: '' });
    // Pobierz dane ogłoszenia do edycji
    axiosClient.get(`ogloszenia_up/${id}`)
      .then(response => {
        setSelectedOgloszenie(response.data.ogloszenia);
        setTitle(response.data.ogloszenia.tytul);
        setContent(response.data.ogloszenia.opis);
        // Ustaw wybrane stanowiska ogłoszenia
        const selectedPositionsIds = response.data.ogloszenia.stanowiska.map(position => position.Stanowisko_id);
        setSelectedPositions(selectedPositionsIds);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
          setError({ __html: finalErrors.join('<br>') }); // Aktualizacja stanu error
        }
      });

    // Pobierz stanowiska z bazy danych
    axiosClient.get('stanowisko')
      .then(({ data }) => {
        if (Array.isArray(data.positions)) {
          setPositions(data.positions);
        } else {
          console.error('Błąd: Brak stanowisk w formacie tablicy');
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
          setError({ __html: finalErrors.join('<br>') }); // Aktualizacja stanu error
        }
      });
  }, [id]);

  // Funkcja do zapisywania edytowanego ogłoszenia
  const handleSaveChanges = () => {
    setError({ __html: '' });
    axiosClient
    .put(`ogloszenia/${id}`, { 
      tytul: title,
      opis: content,
      stanowiska_id: selectedPositions,
    })
    .then(({ data }) => {
      if (!data.error) {
        navigate('/admin/Ogloszenia');
      } else {
        console.error('Błąd Edycji ogłoszenia:', data.message);
      }
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.errors) {
        const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
        setError({ __html: finalErrors.join('<br>') }); // Aktualizacja stanu error
      }
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Edytuj Ogłoszenie
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
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Tytuł
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="off"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                Treść
              </label>
              <div className="mt-2">
                <textarea
                  id="content"
                  name="content"
                  autoComplete="off"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="positions" className="block text-sm font-medium leading-6 text-gray-900">
                Stanowiska
              </label>
              <div className="mt-2">
                {Array.isArray(positions) && positions.map((position) => (
                  <div key={position.Stanowisko_id} className="flex items-center">
                    <input
                      id={`position-${position.Stanowisko_id}`}
                      type="checkbox"
                      value={position.Stanowisko_id}
                      checked={selectedPositions.includes(position.Stanowisko_id)}
                      onChange={(e) => {
                        const positionId = parseInt(e.target.value);
                        setSelectedPositions(prevPositions =>
                          prevPositions.includes(positionId)
                            ? prevPositions.filter(id => id !== positionId)
                            : [...prevPositions, positionId]
                        );
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`position-${position.Stanowisko_id}`} className="ml-2 text-sm text-gray-700">{position.nazwa_stanowiska}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <Link to="/admin/Ogloszenia" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
                Anuluj
              </Link>


              <Link onClick={handleSaveChanges} className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
                Zapisz zmiany
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
