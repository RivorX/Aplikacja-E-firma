import React, { useState, useEffect } from 'react';
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';

export default function PanelGłówny() {
  const [absence, setAbsence] = useState('');
  const [overtimeForm, setOvertimeForm] = useState('');
  const [vacationDays, setVacationDays] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [isPresent, setIsPresent] = useState(false);
  const [obecnoscButtonDisabled, setObecnoscButtonDisabled] = useState(false);
  const [koniecPracyButtonDisabled, setKoniecPracyButtonDisabled] = useState(false);
  const [initialButtonClicked, setInitialButtonClicked] = useState('');
  const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();
  const [userId, setUserId] = useState(currentUser.Pracownicy_id);

  const handleAbsenceChange = (event) => {
    setAbsence(event.target.value);
  };

  const handleOvertimeFormChange = (event) => {
    setOvertimeForm(event.target.value);
  };

  const handleVacationDaysChange = (event) => {
    setVacationDays(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleObecnoscSubmit = async () => {
    try {
      const obecnoscData = {
        pracownik_id: userId,
        data: selectedDate,
        wejscie: new Date().toISOString(),
      };

      const response = await axiosClient.post('/obecnosc', obecnoscData);

      console.log('Dane obecności zostały zapisane:', response.data);
      setIsPresent(true);
      setObecnoscButtonDisabled(true);
      setInitialButtonClicked('Zgłoś obecność');
    } catch (error) {
      console.error('Błąd podczas zapisywania danych obecności:', error);
    }
  };

  const handleKoniecPracySubmit = async () => {
    try {
      const koniecPracyData = {
        pracownik_id: userId,
        data: selectedDate,
        wyjscie: new Date().toISOString(),
      };

      const response = await axiosClient.put(`/obecnosc/${userId}`, koniecPracyData);

      console.log('Dane zakończenia pracy zostały zapisane:', response.data);
      setIsPresent(false);
      setKoniecPracyButtonDisabled(true);
      setInitialButtonClicked('Koniec pracy');
    } catch (error) {
      console.error('Błąd podczas zapisywania danych zakończenia pracy:', error);
    }
  };

  useEffect(() => {
    if (initialButtonClicked === 'Zgłoś obecność') {
      setKoniecPracyButtonDisabled(false);
    } else if (initialButtonClicked === 'Koniec pracy') {
      setObecnoscButtonDisabled(false);
    }
  }, [initialButtonClicked]);

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Panel główny</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <section>
            <div className="overflow-x-auto">
              <div>
                <h2 className="text-xl font-semibold mb-4">Forma wykorzystania nadgodzin:</h2>
                <select className="form-select mb-3 block w-full mt-1" value={overtimeForm} onChange={handleOvertimeFormChange}>
                  <option value="">Wybierz formę wykorzystania nadgodzin</option>
                  <option value="Urlop">Urlop</option>
                  <option value="Premia">Premia</option>
                </select>
                <h2 className="text-xl font-semibold mb-4">Wykorzystaj urlop:</h2>
                <input type="number" className="form-control mb-3 block w-full mt-1" min="0" step="1" value={vacationDays} onChange={handleVacationDaysChange} />
                <h2 className="text-xl font-semibold mb-4">Kalendarz</h2>
                <input type="date" className="form-control mb-3 block w-full mt-1" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)} />
                <button
                  className={`btn btn-primary font-bold py-2 px-4 rounded text-white ${obecnoscButtonDisabled ? 'bg-gray-500 pointer-events-none' : 'bg-blue-500 hover:bg-blue-700'}`}
                  onClick={handleObecnoscSubmit}
                  disabled={obecnoscButtonDisabled}
                >
                  Zgłoś obecność
                </button>
                <button
                  className={`btn btn-secondary font-bold py-2 px-4 rounded text-white ${koniecPracyButtonDisabled ? 'bg-gray-500 pointer-events-none' : 'bg-red-500 hover:bg-red-700'}`}
                  onClick={handleKoniecPracySubmit}
                  disabled={koniecPracyButtonDisabled}
                >
                  Koniec pracy
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
