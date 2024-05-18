import React, { useState, useEffect } from 'react';
import axiosClient from '../axios';
import ObecnoscButton from '../components/ObecnoscButton';

export default function PanelGłówny() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [absence, setAbsence] = useState('');
  const [overtimeForm, setOvertimeForm] = useState('');
  const [vacationDays, setVacationDays] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: userData } = await axiosClient.get('/me');
        setUserId(userData.Pracownicy_id); 
        setLoading(false);
      } catch (error) {
        console.error('Błąd pobierania danych użytkownika:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
      // Tworzenie obiektu obecności do wysłania na serwer
      const obecnoscData = {
        pracownik_id: userId, // Użyj userId pobranego z /me endpoint
        data: selectedDate, // Użyj wybranej daty
        wejscie: new Date().toISOString(), // Pobierz aktualny czas
      };

      // Wyślij żądanie POST na serwer z danymi obecności
      const response = await axiosClient.post('/obecnosc', obecnoscData);

      console.log('Dane obecności zostały zapisane:', response.data);
    } catch (error) {
      console.error('Błąd podczas zapisywania danych obecności:', error);
    }
  };

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
              {loading ? (
                <p>Ładowanie...</p>
              ) : (
                <div>
                  <h2>Zgłoś obecność</h2>
                  <select value={absence} onChange={handleAbsenceChange}>
                    <option value="">Wybierz rodzaj obecności</option>
                    <option value="Przyjście">Przyjście</option>
                    <option value="Wyjście">Wyjście</option>
                  </select>
                  <h2>Forma wykorzystania nadgodzin:</h2>
                  <select value={overtimeForm} onChange={handleOvertimeFormChange}>
                    <option value="">Wybierz formę wykorzystania nadgodzin</option>
                    <option value="Urlop">Urlop</option>
                    <option value="Premia">Premia</option>
                  </select>
                  <h2>Wykorzystaj urlop:</h2>
                  <input type="number" min="0" step="1" value={vacationDays} onChange={handleVacationDaysChange} />
                  <h2>Kalendarz</h2>
                  <input type="date" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)} />
                  <button onClick={handleObecnoscSubmit}>Zgłoś obecność</button>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <ObecnoscButton userId={userId} />
    </>
  );
}