import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { NavLink } from 'react-router-dom';

export default function Pracownicy() {
  const [pracownicy, setPracownicy] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPracownikId, setSelectedPracownikId] = useState(null);
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    // Pobierz pracowników z bazy danych
    axiosClient.get('pracownicy_admin')
      .then(response => {
        setPracownicy(response.data.pracownicy);
        setLoading(false); 
      })
      .catch(error => {
        console.error('Błąd pobierania pracowników:', error);
      });
  }, []);

  const handleTogglePracownikStatus = (id, konto_aktywne) => {
    setSelectedPracownikId(id);
    setActionType('toggle');
    setModalVisible(true);
  };

  const handleDeletePracownik = (id) => {
    setSelectedPracownikId(id);
    setActionType('delete');
    setModalVisible(true);
  };

  const performAction = () => {
    if (actionType === 'toggle') {
      axiosClient.put(`pracownicy/${selectedPracownikId}/change-status`)
        .then(() => {
          const updatedPracownicy = pracownicy.map(pracownik => {
            if (pracownik.Pracownicy_id === selectedPracownikId) {
              return { ...pracownik, konto_aktywne: !pracownik.konto_aktywne };
            }
            return pracownik;
          });
          setPracownicy(updatedPracownicy);
          closeModal();
        })
        .catch(error => {
          console.error('Błąd zmiany statusu pracownika:', error);
          closeModal();
        });
    } else if (actionType === 'delete') {
      axiosClient.delete(`pracownicy/${selectedPracownikId}`)
        .then(response => {
          setPracownicy(pracownicy.filter(pracownik => pracownik.Pracownicy_id !== selectedPracownikId));
          closeModal();
        })
        .catch(error => {
          console.error('Błąd usuwania pracownika:', error);
          closeModal();
        });
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPracownikId(null);
    setActionType('');
  };

  return (
    <>
      {/* Nagłówek */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Lista pracowników</h1>
        </div>
      </header>

      {/* Główna treść */}
      <main>
        <div className="mx-auto max-w-7xl py-6 px-2 sm:px-4 lg:px-4">
          <section>
            <div className="overflow-x-auto">
              {/* Komunikaty ładowania i braku danych */}
              {loading ? (
                <p>Ładowanie...</p>
              ) : pracownicy.length === 0 ? (
                <p>Brak pracowników do wyświetlenia</p>
              ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Imię</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Nazwisko</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Email</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Status Pracownika</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Numer seryjny Karty</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Status Karty</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {pracownicy.map((pracownik, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{pracownik.imie}</td>
                      <td className="px-4 py-2">{pracownik.nazwisko}</td>
                      <td className="px-4 py-2">{pracownik.email}</td>
                      <td className={`border px-4 py-2 ${pracownik.konto_aktywne ? 'text-green-500' : 'text-red-500'}`}>
                          {pracownik.konto_aktywne ? 'Aktywny' : 'Zablokowany'}
                        </td>
                      <td className="px-4 py-2">{pracownik.numer_seryjny}</td>
                      <td className={`border px-4 py-2 ${pracownik.karta_aktywna ? 'text-green-500' : 'text-red-500'}`}>
                          {pracownik.karta_aktywna ? 'Aktywna' : 'Zablokowana'}
                        </td>
                      <td className="px-4 py-2">
                      <NavLink
                          to={`/admin/form/editUser/${pracownik.Pracownicy_id}`}
                          className="text-green-500 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          Edytuj Pracownika
                        </NavLink>
                        <button
                          onClick={() => handleDeletePracownik(pracownik.Pracownicy_id)}
                          className="text-red-500 hover:bg-red-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          Usuń
                        </button>
                        <button
                          onClick={() => handleTogglePracownikStatus(pracownik.Pracownicy_id, pracownik.konto_aktywne)}
                          className={`hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
                            pracownik.konto_aktywne ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                          }`}
                        >
                          {pracownik.konto_aktywne ? 'Zablokuj' : 'Odblokuj'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              )}
            </div>
            {/* Przycisk dodawania nowego pracownika */}
            <div>
              <NavLink
                to="/admin/form/addUser"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 text-sm font-medium mt-4"
              >
                Dodaj nowego użytkownika
              </NavLink>
            </div>
          </section>
        </div>
      </main>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900" id="modal-title">
                      {actionType === 'delete' ? 'Usuwanie pracownika' : 'Zmiana statusu pracownika'}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {actionType === 'delete' ? 'Czy na pewno chcesz usunąć tego pracownika?' : 'Czy na pewno chcesz zmienić status tego pracownika?'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={performAction}
                  type="button"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-${actionType === 'delete' ? 'red' : 'green'}-600 text-base font-medium text-white hover:bg-${actionType === 'delete' ? 'red' : 'green'}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${actionType === 'delete' ? 'red' : 'green'}-500 sm:ml-3 sm:w-auto sm:text-sm`}
                >
                  {actionType === 'delete' ? 'Usuń' : 'Potwierdź'}
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Anuluj
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
