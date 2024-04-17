import ApplicationLogo from './ApplicationLogo';
import axiosClient from '../axios';

import { useContext } from "react";
import { useState } from "react";
import { useStateContext } from '../contexts/ContextProvider';


export default function LoginForm() {
  const { setCurrentUser, setUserToken } = useStateContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError(null);


    axiosClient
      .post('/login', {
        email,
        password
      })
      .then(({data}) => {
        setCurrentUser(data.pracownik_info);
        setUserToken(data.token);
      })
      .catch((error) => {
        if (error.response) {
          // Obsługa błędów zwróconych z serwera
          setError(error.response.data.error);
        } else {
          // Obsługa innych błędów (np. problem z połączeniem)
          setError("Wystąpił problem z połączeniem. Spróbuj ponownie.");
        }
      })
  };

  return (
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex items-center justify-center mb-6">
              <ApplicationLogo  />
            </div>
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Logowanie do konta
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* Wypisywananie błędów z backendu */}
            {error && (
              <div className="bg-red-500 rounded py-2 px-3 text-white">
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
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
                      
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Hasło
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Zapomniałeś hasła?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
                 {/* Przyciski - Cofnij i Zaloguj się */}
              <div className="flex items-center justify-between mt-4">
                <a href="/" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
                        Cofnij
                </a>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition"
                >
                  Zaloguj się
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
  