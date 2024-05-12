import React, { useState, useEffect } from 'react';
import axiosClient from '../axios';
import { Link, useNavigate } from 'react-router-dom'; // Zmiana z Navigate na useNavigate
import { useStateContext } from '../contexts/ContextProvider';

export default function ChangePasswordForm() {
    const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Użycie hooka useNavigate

    useEffect(() => {
        if (!userToken) {
            return navigate('/mainpage'); // Użycie hooka useNavigate
        } 
        axiosClient.get('/me')
            .then(({ data }) => {
                setCurrentUser(data);
                if (currentUser.Data_edycji !== null) {
                    return navigate('/'); // Użycie hooka useNavigate
                }
                console.log(data); // TODO Usunąć
            });
    }, []);

    const handleSaveChanges = (e) => {
        e.preventDefault(); // Zapobiega domyślnemu zachowaniu formularza
        // Walidacja pól nowego hasła i jego potwierdzenia
        if (newPassword !== confirmNewPassword) {
            setError('Nowe hasło i jego potwierdzenie nie są zgodne.');
            return;
        }

        // Wysłanie żądania do serwera
        axiosClient.post('change-password', {
            Pracownicy_id: currentUser.Pracownicy_id,
            Data_utworzenia: currentUser.Data_utworzenia,
            new_password: newPassword
        })
            .then(({ data }) => {
                setCurrentUser(data.pracownik_info);
                setUserToken(data.token);
                console.log(data); // TODO Usunąć
                navigate('/'); // Użycie hooka useNavigate
            })
            .catch(error => {
                console.error('Błąd zmiany hasła:', error); // Obsługa błędu
                setError('Wystąpił błąd podczas zmiany hasła. Spróbuj ponownie.');
            });
    };

    // Wylogowanie
    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.delete('/logout')
            .then(res => {
                setCurrentUser({});
                setUserToken(null);
            });
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Zmień hasło
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {/* Wyświetlanie błędu */}
                {error && (
                    <div className="bg-red-500 rounded py-2 px-3 text-white">
                        {error}
                    </div>
                )}

                <form className="space-y-6">
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">
                            Nowe hasło
                        </label>
                        <div className="mt-2">
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirmNewPassword" className="block text-sm font-medium leading-6 text-gray-900">
                            Potwierdź nowe hasło
                        </label>
                        <div className="mt-2">
                            <input
                                type="password"
                                id="confirmNewPassword"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <Link onClick={logout} className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
                            Anuluj
                        </Link>
                        <button onClick={handleSaveChanges} className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
                            Zmień hasło
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
