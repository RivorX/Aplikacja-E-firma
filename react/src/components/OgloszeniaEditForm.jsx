import React, { useState, useEffect } from 'react';

export default function OgloszeniaForm() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [employees1, setEmployees1] = useState(false);
  const [forEmployees, setForEmployees] = useState(false);

  // Pobierz listę ogłoszeń z API lub innej bazy danych
  useEffect(() => {
    // Tu umieść logikę pobierania listy ogłoszeń
    const fetchedNews = []; // Załóżmy, że dostajesz listę ogłoszeń w formie tablicy fetchedNews
    setNewsList(fetchedNews);
  }, []);

  // Funkcja do zapisywania zmian w ogłoszeniu
  const handleSaveChanges = (event) => {
    event.preventDefault();
    // Tutaj możesz zaimplementować logikę zapisu zmian w ogłoszeniu
    console.log("Zapisano zmiany w ogłoszeniu:", { title, content, employees1, forEmployees });
  };

  // Funkcja do wyboru ogłoszenia z listy do edycji
  const handleNewsSelection = (event) => {
    const selectedNewsId = event.target.value;
    const newsToEdit = newsList.find(news => news.id === selectedNewsId); // Załóżmy, że każde ogłoszenie ma unikalne id
    setSelectedNews(newsToEdit);
    if (newsToEdit) {
      setTitle(newsToEdit.title);
      setContent(newsToEdit.content);
      setEmployees1(newsToEdit.employees1);
      setForEmployees(newsToEdit.forEmployees);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Edycja ogłoszenia
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSaveChanges}>
            <div>
              <label htmlFor="news" className="block text-sm font-medium leading-6 text-gray-900">
                Wybierz ogłoszenie do edycji
              </label>
              <div className="mt-2">
                <select
                  id="news"
                  name="news"
                  autoComplete="news"
                  onChange={handleNewsSelection}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Wybierz z listy</option>
                  {newsList.map(news => (
                    <option key={news.id} value={news.id}>{news.title}</option>
                  ))}
                </select>
              </div>
            </div>

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

            <div className="flex items-center">
              <input
                id="employees1"
                name="employees1"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={employees1}
                onChange={(e) => setEmployees1(e.target.checked)}
              />
              <label htmlFor="employees1" className="ml-2 block text-sm font-medium leading-5 text-gray-900">
                Pracownicy 1
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="forEmployees"
                name="forEmployees"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={forEmployees}
                onChange={(e) => setForEmployees(e.target.checked)}
              />
              <label htmlFor="forEmployees" className="ml-2 block text-sm font-medium leading-5 text-gray-900">
                Pracownicy 2
              </label>
            </div>

            <div className="flex items-center justify-between mt-4">
              <a href="/" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
                Anuluj
              </a>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition"
              >
                Zapisz zmiany
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
