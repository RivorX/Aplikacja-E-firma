import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { NavLink } from 'react-router-dom';

export default function StrefyDostepu() {
  const [strefy, setStrefy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noStrefy, setNoStrefy] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStrefaId, setSelectedStrefaId] = useState(null);
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    const fetchStrefy = async () => {
      try {
        const response = await axiosClient.get('strefy-dostepu');
        const strefyData = response.data.strefyDostepu || [];
        setStrefy(strefyData);
        setLoading(false);
        if (strefyData.length === 0) {
          setNoStrefy(true);
        }
      } catch (error) {
        console.error('Błąd pobierania stref dostępu:', error);
        setLoading(false);
        setNoStrefy(true);
        setStrefy([]);
      }
    };
  
    fetchStrefy();
  }, []);

  const handleDeleteStrefa = (id) => {
    setSelectedStrefaId(id);
    setActionType('delete');
    setModalVisible(true);
  };

  const handleEditStrefa = (id) => {
    setSelectedStrefaId(id);
    setActionType('edit');
    setModalVisible(true);
  };

  const performAction = () => {
    if (actionType === 'delete') {
      axiosClient
        .delete(`strefy-dostepu/${selectedStrefaId}`)
        .then(() => {
          setStrefy(strefy.filter(strefa => strefa.Strefa_Dostepu_id !== selectedStrefaId));
          closeModal();
        })
        .catch((error) => {
          console.error('Błąd usuwania strefy dostępu:', error);
          closeModal();
        });
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedStrefaId(null);
    setActionType('');
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Lista stref dostępu</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <section>
            <div className="overflow-x-auto">
              {loading ? (
                <p>Ładowanie...</p>
              ) : noStrefy ? (
                <p>Brak stref do wyświetlenia</p>
              ) : (
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Nr strefy</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Nazwa strefy</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Budynek</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {strefy.map((strefa) => (
                      <tr key={strefa.Strefa_Dostepu_id}>
                        <td className="border px-4 py-2 text-gray-700">{strefa.Strefy_Dostepu_id}</td>
                        <td className="border px-4 py-2 text-gray-700">{strefa.nazwa_strefy}</td>
                        <td className="border px-4 py-2 text-gray-700">{strefa.budynek}</td>
                        <td className="border px-4 py-2 text-gray-700">
                          <NavLink
                            to={`/admin/form/StrefaDostepu_UPDATE/${strefa.Strefy_Dostepu_id}`}
                            className="text-indigo-600 hover:bg-indigo-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          >
                            Edytuj
                          </NavLink>
                          <button
                            onClick={() => handleDeleteStrefa(strefa.Strefy_Dostepu_id)}
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
                to="/admin/form/ADDStrefaDostepu"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 text-sm font-medium mt-4"
              >
                Dodaj nową Strefę
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
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900" id="modal-title">
                      {actionType === 'delete' ? 'Usuwanie strefy dostępu' : 'Edytowanie strefy dostępu'}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {actionType === 'delete' ? 'Czy na pewno chcesz usunąć tę strefę dostępu?' : 'Edytuj dane strefy dostępu.'}
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
