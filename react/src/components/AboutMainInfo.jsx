import React from 'react';

export default function AboutMainInfo() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Informacje o firmie</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Nasza historia:</h2>
                    <p>Tutaj możesz opowiedzieć krótko o historii firmy, jej założeniu i rozwoju.</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Nasza misja:</h2>
                    <p>Opisz, jakie cele i wartości przyświecają Twojej firmie.</p>
                </div>
            </div>
        </div>
    );
}
