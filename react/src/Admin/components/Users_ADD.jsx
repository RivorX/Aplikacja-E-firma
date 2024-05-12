import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios.js';
import { useNavigate, Link } from 'react-router-dom';

export default function RegistrationForm() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [customPosition, setCustomPosition] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroup] = useState("");
  const [description, setDescription] = useState(""); // Dodane
  const [hourlyRate, setHourlyRate] = useState(""); // Dodane
  const [positionsList, setPositionsList] = useState([]);
  const [error, setError] = useState({ __html: "" });


  useEffect(() => {
    // Pobierz stanowiska z bazy danych przy załadowaniu komponentu
    axiosClient
      .get('positions')
      .then(response => {
        setPositionsList(response.data); // Ustaw listę stanowisk w stanie komponentu
      })
      .catch(error => {
        console.error('Error fetching positions:', error);
      });
  }, []);

  
  const handleSaveChanges = () => {
    setError({ __html: '' });

    axiosClient
      .post('/adduser', {
        imie: firstName,
        nazwisko: lastName,
        email: email,
        group: group,
        position: position === 'other' ? customPosition : position,
        description: position === 'other' ? description : '',
        hourlyRate: position === 'other' ? hourlyRate : ''
      })
      .then(({ data }) => {
        console.log(data);
        // Sprawdzamy, czy nie ma błędów w odpowiedzi z serwera
        if (!data.error) {
          navigate('/admin/pracownicy');
        } else {
          console.error('Błąd dodawania Pracownika:', data.message);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
          setError({ __html: finalErrors.join('<br>') }); // Aktualizacja stanu error
        }
      });
  };

  // Walidacje
  const handlePositionChange = (event) => {
    const selectedPosition = event.target.value;
    setPosition(selectedPosition);
    if (selectedPosition !== "other") {
      setCustomPosition(""); 
    }
  };

  const handleCustomPositionChange = (event) => {
    setCustomPosition(event.target.value);
  };


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Rejestracja nowego konta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Wypisywananie błędów z backendu */}
          {error.__html && (
            <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>
            </div>
          )}


          <form className="space-y-6" method="POST">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                Imię
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  maxLength="45"
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={ev => setFirstName(ev.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                Nazwisko
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  maxLength="45"
                  autoComplete="family-name"
                  required
                  value={lastName}
                  onChange={ev => setLastName(ev.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium leading-6 text-gray-900">
                Stanowisko
              </label>
              <div className="mt-2">
              <select
                id="position"
                name="position"
                autoComplete="position"
                value={position}
                onChange={handlePositionChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Wybierz z listy</option>
                {Array.isArray(positionsList.positions) && positionsList.positions.map(position => (
                    <option key={position.Stanowisko_id} value={position.nazwa_stanowiska}>{position.nazwa_stanowiska}, {position.stawka_h}zł</option>
                ))}
                <option value="other">Inne</option>
              </select>



              </div>
            </div>

            {/* Dodatkowe pola dla nowego stanowiska */}
            {position === "other" && (
              <>
                <div>
                  <label htmlFor="customPosition" className="block text-sm font-medium leading-6 text-gray-900">
                    Nazwa Stanowiska
                  </label>
                  <div className="mt-2">
                    <input
                      id="customPosition"
                      name="customPosition"
                      type="text"
                      maxLength="45"
                      autoComplete="off"
                      value={customPosition}
                      onChange={handleCustomPositionChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                    Opis
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      maxLength="200"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                </div>
                <div>
                <label htmlFor="hourlyRate" className="block text-sm font-medium leading-6 text-gray-900">
                  Stawka za h
                  </label>
                  <div className="mt-2">
                    <input
                      id="hourlyRate"
                      name="hourlyRate"
                      type="number"
                      step="0.01"
                      min="0"
                      maxLength="45"
                      autoComplete="off"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === '-' || e.key === 'e') {
                          e.preventDefault();
                        }
                      }}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Adres Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  maxLength="45"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>

              <div>
                <label htmlFor="group" className="block text-sm font-medium leading-6 text-gray-900">
                  Grupa
                </label>
                <div className="mt-2">
                  <select
                    id="group"
                    name="group"
                    autoComplete="group"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                  >
                    <option value="">Wybierz z listy</option>
                    <option value="admin">Admin</option>
                    <option value="pracownik">Pracownik</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <Link to="/admin/pracownicy" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
                  Anuluj
                </Link>


                <Link onClick={handleSaveChanges} className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
                  Dodaj
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}