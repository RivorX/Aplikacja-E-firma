import React, { useState } from 'react';
import axios from '../../axios';

const Raporty = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');

    const handleDownloadReport = async () => {
        if (endDate <= startDate) {
            setError('End date must be greater than start date');
            return;
        }
        setError('');
        try {
            const response = await axios.post('/logs/card', {
                startDate,
                endDate
            }, {
                responseType: 'blob' // ważne, aby pobrać plik jako blob
            });

            // Utworzenie URL dla pobranego pliku
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const name = 'report'+startDate+'-'+endDate+'.pdf';
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading the report', error);
        }
    };

    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Tworzenie raportów</h1>
                </div>
            </header>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Raport ilości prób dostępu</h1>
                           
                        <div className="col-span-full mb-6">
                            <label className="form-label">
                                Start Date:
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="form-control" />
                            </label>
                        </div>
                        <div className="col-span-full mb-6">
                            <label className="form-label">
                                End Date:
                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="form-control" />
                            </label>
                        </div>
                        {error && <div className="col-span-full mb-6 alert alert-danger font-bold">{error}</div>}
                        <div className="col-span-full mb-6 text-center">
                            <button onClick={handleDownloadReport} 
                            className="text-2xl text-indigo-600 hover:bg-indigo-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                            >
                                Pobierz Raport
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Raporty;