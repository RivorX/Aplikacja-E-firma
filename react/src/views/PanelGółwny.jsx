import React, { useState, useEffect } from 'react';
import axiosClient from '../axios';
import { useStateContext } from '../contexts/ContextProvider';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function PanelGłówny() {
  const [overtimeForm, setOvertimeForm] = useState('');
  const [vacationDays, setVacationDays] = useState(0);
  const [selectedDates, setSelectedDates] = useState([]);
  const [isPresent, setIsPresent] = useState(false);
  const [obecnoscButtonDisabled, setObecnoscButtonDisabled] = useState(false);
  const [koniecPracyButtonDisabled, setKoniecPracyButtonDisabled] = useState(false);
  const [initialButtonClicked, setInitialButtonClicked] = useState('');
  const { currentUser } = useStateContext();
  const [userId, setUserId] = useState(currentUser.Pracownicy_id);
  const [pracownik, setPracownik] = useState(null);
  const [error, setError] = useState('');

  const handleOvertimeFormChange = (event) => {
    setOvertimeForm(event.target.value);
  };

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
    if (dates.length > pracownik.ilosc_dni_urlopu) {
      setError('Nie możesz wziąć więcej dni urlopu niż masz dostępnych.');
    } else {
      setError('');
    }
  };

  const handleObecnoscSubmit = async () => {
    try {
      const obecnoscData = {
        pracownik_id: userId,
        data: new Date().toISOString(),
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
        data: new Date().toISOString(),
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

  const handleVacationSubmit = async () => {
    if (selectedDates.length === 0) {
      setError('Musisz wybrać co najmniej jeden dzień urlopu.');
      return;
    }
    if (selectedDates.length > pracownik.ilosc_dni_urlopu) {
      setError('Nie możesz wziąć więcej dni urlopu niż masz dostępnych.');
      return;
    }

    try {
      const vacationData = {
        pracownik_id: userId,
        liczba_dni_urlopu: selectedDates.length,
        daty_urlopu: selectedDates,
      };

      const response = await axiosClient.post('/urlopy', vacationData);
      console.log('Urlop został zgłoszony:', response.data);

      // Aktualizacja liczby dni urlopu po zgłoszeniu urlopu
      const updatedVacationDays = pracownik.ilosc_dni_urlopu - selectedDates.length;
      setPracownik(prevState => ({
        ...prevState,
        ilosc_dni_urlopu: updatedVacationDays
      }));
      setSelectedDates([]);
      setError('');
    } catch (error) {
      console.error('Błąd podczas zgłaszania urlopu:', error);
      setError('Wystąpił błąd podczas zgłaszania urlopu.');
    }
  };

  useEffect(() => {
    if (initialButtonClicked === 'Zgłoś obecność') {
      setKoniecPracyButtonDisabled(false);
    } else if (initialButtonClicked === 'Koniec pracy') {
      setObecnoscButtonDisabled(false);
    }
  }, [initialButtonClicked]);

  useEffect(() => {
    const fetchPracownik = async () => {
      try {
        const response = await axiosClient.get(`/pracownicy/${userId}`);
        setPracownik(response.data.pracownik);
        setVacationDays(response.data.pracownik.ilosc_dni_urlopu);
      } catch (error) {
        console.error('Błąd podczas pobierania danych pracownika:', error);
      }
    };

    fetchPracownik();
  }, [userId]);

  if (!pracownik) {
    return <div>Ładowanie...</div>;
  }

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
                <h2 className="text-xl font-semibold mb-4">Forma wykorzystania nadgodzin:</h2>
                <select className="form-select mb-3 block w-full mt-1" value={overtimeForm} onChange={handleOvertimeFormChange}>
                  <option value="">Wybierz formę wykorzystania nadgodzin</option>
                  <option value="Urlop">Urlop</option>
                  <option value="Premia">Premia</option>
                </select>
                <h2 className="text-xl font-semibold mb-4">Wykorzystaj urlop:                <h2 className="text-xl font-semibold mb-4">Liczba dni urlopu: {pracownik.ilosc_dni_urlopu}</h2>
                </h2>
                
                {error && <p className="text-red-500">{error}</p>}
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDates}
                  selectRange={true}
                />
                <button
                  className="btn btn-primary font-bold py-2 px-4 rounded text-white bg-blue-500 hover:bg-blue-700 mt-4"
                  onClick={handleVacationSubmit}
                  disabled={selectedDates.length === 0 || selectedDates.length > pracownik.ilosc_dni_urlopu}
                >
                  Zgłoś urlop
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
