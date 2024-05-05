import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { NavLink } from 'react-router-dom';

export default function PrzegladDrzwiKodyQR() {
  const [drzwiKodyQR, setDrzwiKodyQR] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDrzwiId, setSelectedDrzwiId] = useState(null);

  useEffect(() => {
    fetchDrzwis();
  }, []);

  const fetchDrzwis = async () => {
    try {
      const response = await axiosClient.get('drzwi'); 
      setDrzwiKodyQR(response.data);
    } catch (error) {
      console.error('Błąd pobierania drzwi/kodów QR:', error);
    }
  };

  const handleDelete = (id) => {
    setSelectedDrzwiId(id);
    setModalVisible(true);
  };

  const performDeleteAction = () => {
    axiosClient
      .delete(`drzwi/${selectedDrzwiId}`)
      .then(() => {
        setDrzwiKodyQR(drzwiKodyQR.filter(drzwi => drzwi.Drzwi_id !== selectedDrzwiId));
        closeModal();
      })
      .catch((error) => {
        console.error('Błąd usuwania drzwi:', error);
        closeModal();
      });
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDrzwiId(null);
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Przegląd Drzwi / Kody QR</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <section>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Nr wejścia</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Nazwa</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">We/Wy</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Strefa wymagana</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Drzwi aktywne</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Ostatnia zmiana kodu</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {drzwiKodyQR.map((element, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{element?.nr_drzwi || '-'}</td>
                      <td className="px-4 py-2">{element?.nazwa || '-'}</td>
                      <td className="px-4 py-2">{element?.WeWy || '-'}</td>
                      <td className="px-4 py-2">{element?.strefy_dostepu?.nazwa_strefy || '-'}</td>
                      <td className="px-4 py-2">{element?.drzwi_aktywne ? 'Tak' : 'Nie'}</td>
                      <td className="px-4 py-2">{element?.ostatnia_zmiana_kodu || '-'}</td>
                      <td className="px-4 py-2">
                        <button className="text-indigo-600 hover:bg-indigo-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                          Drukuj
                        </button>
                        <NavLink
                          to={`/admin/form/editKodyQR/${element.Drzwi_id}`}
                          className="text-indigo-600 hover:bg-indigo-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          Edytuj
                        </NavLink>
                        <button
                          onClick={() => handleDelete(element.Drzwi_id)}
                          className="text-red-500 hover:bg-red-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          Usuń
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <NavLink
                to="/admin/form/addKodyQR"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 text-sm font-medium mt-4"
              >
                Dodaj nowe drzwi
              </NavLink>
            </div>
          </section>
        </div>
      </main>
      {/* Okno modalne potwierdzenia usuwania */}
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
                        Usuwanie drzwi
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Czy na pewno chcesz usunąć te drzwi?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  {/* Przycisk potwierdzenia usuwania */}
                  <button
                    onClick={performDeleteAction}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Usuń
                  </button>
                  {/* Przycisk anulowania usuwania */}
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
