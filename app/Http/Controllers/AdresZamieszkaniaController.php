<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AdresZamieszkania;

class AdresZamieszkaniaController extends Controller
{
    public function index()
    {
        $adresyZamieszkania = AdresZamieszkania::all();
        return response()->json(['adresyZamieszkania' => $adresyZamieszkania]);
    }

    public function show($id)
    {
        $adresZamieszkania = AdresZamieszkania::find($id);
        if (!$adresZamieszkania) {
            return response()->json(['message' => 'Adres zamieszkania o podanym ID nie istnieje'], 404);
        }
        return response()->json(['adresZamieszkania' => $adresZamieszkania]);
    }
    // Zwraca adresy zamieszkania dla podanego pracownika
    public function show_pracownik_id($pracownikId)
    {
        $adresZamieszkania = AdresZamieszkania::whereHas('pracownicy', function ($query) use ($pracownikId) {
            $query->where('Pracownicy.Pracownicy_id', $pracownikId);
        })->get();
    
        if ($adresZamieszkania->isEmpty()) {
            return response()->json(['message' => 'Brak adresów zamieszkania dla podanego pracownika'], 404);
        }
    
        return response()->json(['adresZamieszkania' => $adresZamieszkania]);
    }
    


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'data_dodania' => 'required|date',
            'miasto' => 'required|string',
            'ulica' => 'required|string',
            'nr_domu' => 'required|string',
            'kod_pocztowy' => 'required|string',
        ]);

        $adresZamieszkania = AdresZamieszkania::create($validatedData);

        return response()->json(['message' => 'Adres zamieszkania dodany', 'adresZamieszkania' => $adresZamieszkania], 201);
    }

    public function update(Request $request, $id)
    {
        $adresZamieszkania = AdresZamieszkania::find($id);
        if (!$adresZamieszkania) {
            return response()->json(['message' => 'Adres zamieszkania o podanym ID nie istnieje'], 404);
        }

        $validatedData = $request->validate([
            'data_dodania' => 'required|date',
            'miasto' => 'required|string',
            'ulica' => 'required|string',
            'nr_domu' => 'required|string',
            'kod_pocztowy' => 'required|string',
        ]);

        $adresZamieszkania->update($validatedData);

        return response()->json(['message' => 'Adres zamieszkania zaktualizowany', 'adresZamieszkania' => $adresZamieszkania]);
    }

    public function destroy($id)
    {
        $adresZamieszkania = AdresZamieszkania::find($id);
        if (!$adresZamieszkania) {
            return response()->json(['message' => 'Adres zamieszkania o podanym ID nie istnieje'], 404);
        }

        $adresZamieszkania->delete();

        return response()->json(['message' => 'Adres zamieszkania usunięty']);
    }
}

