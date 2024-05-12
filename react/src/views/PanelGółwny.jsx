// TODO - zaimplementować funkcjonalność zgłaszania obecności, wykorzystania nadgodzin i urlopu

import React, { useState } from 'react';

export default function PanelGłówny() {
    const [absence, setAbsence] = useState('');
    const [overtimeForm, setOvertimeForm] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const handleAbsenceChange = (event) => {
        setAbsence(event.target.value);
    };

    const handleOvertimeFormChange = (event) => {
        setOvertimeForm(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
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
                    <div>
                        <h2>Zgłoś obecność</h2>
                        <select value={absence} onChange={handleAbsenceChange}>
                            <option value="">Wybierz rodzaj obecności</option>
                            <option value="Przyjście">Przyjście</option>
                            <option value="Wyjście">Wyjście</option>
                        </select>
                    </div>
                    <div>
                        <h2>Forma wykorzystania nadgodzin:</h2>
                        <select value={overtimeForm} onChange={handleOvertimeFormChange}>
                            <option value="">Wybierz formę wykorzystania nadgodzin</option>
                            <option value="Urlop">Urlop</option>
                            <option value="Premia">Premia</option>
                        </select>
                    </div>
                    <div>
                        <h2>Wykorzystaj urlop:</h2>
                        <input type="number" min="0" step="1" />
                    </div>
                    <div>
                        <h2>Kalendarz</h2>
                        <input type="date" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)} />
                    </div>
                </div>
            </main>
        </>
    );
}
