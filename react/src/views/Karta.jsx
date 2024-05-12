import React, { useState, useEffect } from 'react';
import axiosClient from '../axios';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function Karta() {
  const [karty, setKarty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noKarty, setNoKarty] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const fetchUserAndKarty = async () => {
      try {
        const { data: userData } = await axiosClient.get('/me');
        const userId = userData.Pracownicy_id;

        const { data: userKarty } = await axiosClient.get(`/karty_dostepu/${userId}/pracownik`);
        setKarty(userKarty.kartyDostepu || []);
        setLoading(false);
        if (userKarty.kartyDostepu.length === 0) {
          setNoKarty(true);
        }
      } catch (error) {
        console.error('Błąd pobierania kart dostępu:', error);
        setLoading(false);
        setNoKarty(true);
        setKarty([]);
      }
    };
  
    fetchUserAndKarty();

    // Zdarzenie przed opuszczeniem strony
    const cleanup = () => {
      if (scanning) {
        window.removeEventListener('beforeunload', cleanup);
        stopScanning();
      }
    };
    window.addEventListener('beforeunload', cleanup);

    return () => window.removeEventListener('beforeunload', cleanup);
  }, [scanning]);

  const startScanning = () => {
    setScanning(true);
    const scanner = new Html5QrcodeScanner('reader', {
      fps: 10,
      qrbox: 250,
    });
    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);
      console.log(result);
      setScanning(false);
    }
    function error(error) {
      console.log(error);
      setScanning(false);
    }
  };

  const stopScanning = () => {
    setScanning(false);
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Twoje karty dostępu</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <section>
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">QR Code Scanning</h1>
              {!scanning && <button onClick={startScanning} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Skanuj</button>}
              {scanResult ? <p>{scanResult}</p> : <div id="reader"></div>}
            </div>
            <div className="overflow-x-auto">
              {loading ? (
                <p>Ładowanie...</p>
              ) : noKarty ? (
                <p>Brak kart do wyświetlenia</p>
              ) : (
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Nr karty</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Data wydania</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Data ważności</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Strefy dostępu</th>
                      <th className="px-4 py-2 bg-gray-200 text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {karty.map((karta) => (
                      <tr key={karta.Karta_Dostepu_id}>
                        <td className="border px-4 py-2 text-gray-700">{karta.numer_seryjny}</td>
                        <td className="border px-4 py-2 text-gray-700">{karta.data_wydania}</td>
                        <td className="border px-4 py-2 text-gray-700">{karta.data_waznosci}</td>
                        <td className="border px-4 py-2 text-gray-700">
                          {karta.strefy_dostepu.length > 0 ? (
                            karta.strefy_dostepu.map((strefy_dostepu, index) => (
                              <span key={index}>{strefy_dostepu.nazwa_strefy}, </span>
                            ))
                          ) : (
                            <span>Brak</span>
                          )}
                        </td>
                        <td className={`border px-4 py-2 ${karta.karta_aktywna ? 'text-green-500' : 'text-red-500'}`}>
                          {karta.karta_aktywna ? 'Aktywna' : 'Zablokowana'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
