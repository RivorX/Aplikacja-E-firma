import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { NavLink } from 'react-router-dom';

export default function Aktualnosci() {
  const [aktualnosci, setAktualnosci] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAktualnoscId, setSelectedAktualnoscId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient.get('aktualnosci_admin')
      .then(response => {
        setAktualnosci(response.data.news);
        setLoading(false);
      })
      .catch(error => {
        console.error('Błąd pobierania aktualności:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setSelectedAktualnoscId(id);
    setModalVisible(true);
  };

  const performDelete = () => {
    axiosClient.delete(`aktualnosci/${selectedAktualnoscId}`)
      .then(() => {
        setAktualnosci(aktualnosci.filter(item => item.Aktualnosci_id !== selectedAktualnoscId));
        closeModal();
      })
      .catch(error => {
        console.error('Błąd usuwania aktualności:', error);
        setError('Wystąpił błąd podczas usuwania aktualności.');
        closeModal();
      });
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAktualnoscId(null);
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Aktualności</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <section>
            <div className="overflow-x-auto">
              {loading ? (
                <p>Ładowanie...</p>
              ) : aktualnosci.length === 0 ? (
                <p>Brak aktualności do wyświetlenia</p>
              ) : (
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Nr aktualności</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Nazwa aktualności</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Opis</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Data nadania</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aktualnosci.map((aktualnosciItem, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{aktualnosciItem.Aktualnosci_id}</td>
                        <td className="px-4 py-2">{aktualnosciItem.tytul}</td>
                        <td className="px-4 py-2">{aktualnosciItem.opis}</td>
                        <td className="px-4 py-2">{aktualnosciItem.data_nadania}</td>
                        <td className="px-4 py-2">
                          <NavLink
                            to={`/admin/form/editnews/${aktualnosciItem.Aktualnosci_id}`}
                            className="text-green-500 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          >
                            Edytuj
                          </NavLink>
                          <button
                            onClick={() => handleDelete(aktualnosciItem.Aktualnosci_id)}
                            className="text-red-500 hover:bg-red-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          >
                            Usuń
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div>
              <NavLink
                to="/admin/form/addnews"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 text-sm font-medium mt-4"
              >
                Dodaj nową aktualność
              </NavLink>
            </div>
          </section>
        </div>
      </main>

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
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Usuwanie aktualności
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Czy na pewno chcesz usunąć tę aktualność?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={performDelete}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Usuń
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
