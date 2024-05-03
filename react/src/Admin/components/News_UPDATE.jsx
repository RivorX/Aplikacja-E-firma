import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function News_UPDATE() {
  const { id } = useParams();
  const [selectedNews, setSelectedNews] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [error, setError] = useState({ __html: "" });
  const navigate = useNavigate(); 

  useEffect(() => {
    setError({ __html: '' });
    // Pobierz dane konkretnej aktualności do edycji
    axiosClient.get(`aktualnosci/${id}`)
      .then(response => {
        setSelectedNews(response.data.news);
        setTitle(response.data.news.tytul);
        setContent(response.data.news.opis);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
          setError({ __html: finalErrors.join('<br>') }); // Aktualizacja stanu error
        }
      });
  }, [id]);

  // Funkcja do zapisywania edytowanej aktualności
  const handleSaveChanges = () => {
    axiosClient
    .put(`aktualnosci/${id}`, { 
      tytul: title,
      opis: content,
    })
    .then(({ data }) => {
      if (!data.error) {
        navigate('/admin/aktualnosci');
      } else {
        console.error('Błąd Edycji Aktualności:', data.message);
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
            Edytuj Aktualności
          </h2>
          {/* Wypisywananie błędów z backendu */}
          {error.__html && (
            <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>
            </div>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            {/* Pozostałe pola do edycji aktualności */}
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

            <div className="flex items-center justify-between mt-4">
              <Link to="/admin/aktualnosci" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
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
