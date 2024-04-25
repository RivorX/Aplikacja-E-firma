import React from 'react';

function ContactMainInfo() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Nasz Kontakt</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Dane kontaktowe:</h2>
                    <p>Adres: ul. Przykładowa 123, 00-000 Warszawa</p>
                    <p>Telefon: +48 123 456 789</p>
                    <p>Email: kontakt@example.com</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Godziny otwarcia:</h2>
                    <p>Poniedziałek - Piątek: 9:00 - 17:00</p>
                    <p>Sobota: 10:00 - 14:00</p>
                    <p>Niedziela: Zamknięte</p>
                </div>
            </div>
        </div>
    );
}

export default ContactMainInfo;
