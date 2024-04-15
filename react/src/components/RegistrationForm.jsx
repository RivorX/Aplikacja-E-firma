import React, { useState } from 'react';

import axiosClient from '../axios';


export default function RegistrationForm() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [position, setPosition] = useState("");
  const [customPosition, setCustomPosition] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroup] = useState("");
  const [error, setError] = useState({__html: ""});

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({__html: ''});


    axiosClient
      .post('/adduser', {
        firstName,
        lastName,
        email,
        password,
        group,
        position: position === 'other' ? customPosition : position
      })
      .then(({data}) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  // Walidacje
  const handlePositionChange = (event) => {
    const selectedPosition = event.target.value;
    setPosition(selectedPosition);
    if (selectedPosition !== "other") {
      setCustomPosition(""); // Wyczyść wartość niestandardowego stanowiska, jeśli wybrano opcję z listy
    }
  };

  const handleCustomPositionChange = (event) => {
    setCustomPosition(event.target.value);
  };

  const isPasswordValid = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Rejestracja nowgo konta
          </h2>
        </div>
  
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                Imię
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
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
                  <option value="stanowisko1">Stanowisko 1</option>
                  <option value="stanowisko2">Stanowisko 2</option>
                  <option value="other">Inne</option> {/* Dodana opcja "Inne", wywołuje to dodanie stanowiska */}
                </select>
              </div>
            </div>

            {/* Dodatkowe pole dla nowego stanowiska */}
            {position === "other" && (
              <div>
                <label htmlFor="customPosition" className="block text-sm font-medium leading-6 text-gray-900">
                  Nowe Stanowisko
                </label>
                <div className="mt-2">
                  <input
                    id="customPosition"
                    name="customPosition"
                    type="text"
                    autoComplete="off"
                    value={customPosition}
                    onChange={handleCustomPositionChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
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
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Hasło
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    password && !isPasswordValid(password) ? 'border-red-500' : ''
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password && !isPasswordValid(password) && (
                  <p className="mt-1 text-sm text-red-500">Hasło musi mieć co najmniej 8 znaków, zawierać przynajmniej jedną małą literę, jedną dużą literę, jedną cyfrę oraz jeden znak specjalny.</p>
                )}
              </div>
            </div>

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
              <a href="/" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
                Anuluj
              </a>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition"
              >
                Zarejestruj się
              </button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
