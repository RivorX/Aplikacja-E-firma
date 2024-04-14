import React, { useState } from 'react';

export default function EditNewsForm() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  // Funkcja do pobierania i ustawiania wybranej aktualności do edycji
  const handleNewsSelection = (event) => {
    const selectedNewsId = event.target.value;
    const newsToEdit = getNewsById(selectedNewsId); // Załóżmy, że masz funkcję getNewsById, która pobiera aktualność po jej ID
    setSelectedNews(newsToEdit);
    if (newsToEdit) {
      setTitle(newsToEdit.title);
      setImage(newsToEdit.image);
      setContent(newsToEdit.content);
    }
  };

  // Funkcja do zapisywania edytowanej aktualności
  const handleSaveChanges = () => {
    // Tutaj możesz zaimplementować logikę zapisu zmian w aktualności
    console.log("Zapisano zmiany w aktualności:", selectedNews);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Edytuj Aktualności
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="news" className="block text-sm font-medium leading-6 text-gray-900">
                Wybierz Aktualność do Edycji
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
                  {/* Tutaj możesz wygenerować opcje wyboru z listy aktualności */}
                </select>
              </div>
            </div>

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
              <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                Obraz
              </label>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              <a href="/" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
                Anuluj
              </a>
              <button
                type="button" /* Zmieniamy na button zamiast submit */
                onClick={handleSaveChanges} /* Wywołujemy funkcję obsługującą zapis zmian */
                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition"
              >
                Zapisz Zmiany
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
