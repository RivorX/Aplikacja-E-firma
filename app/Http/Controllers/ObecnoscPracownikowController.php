<?php
// app/Http/Controllers/ObecnoscPracownikowController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ObecnoscPracownikow;
use Carbon\Carbon;

class ObecnoscPracownikowController extends Controller
{
    public function store(Request $request)
    {
    // Pobierz id aktualnie zalogowanego użytkownika
    $userId = $request->user()->Pracownicy_id;

    // Pobierz aktualną datę i czas wejścia
    $currentDateTime = Carbon::now();

    // Pobierz aktualną datę w formacie daty SQL
    $currentDate = $currentDateTime->toDateString();

    // Tworzenie nowego wpisu w tabeli obecnosc_pracownikow z przekazanymi danymi
    $obecnosc = ObecnoscPracownikow::create([
        'Pracownicy_id' => $userId,
        'Data' => $currentDate,
        'Wejście' => $currentDateTime,
    ]);

    return response()->json($obecnosc);
    }

    public function update(Request $request, $userId)
    {
        // Znajdź najnowszą obecność pracownika
        $obecnosc = ObecnoscPracownikow::where('Pracownicy_id', $userId)->latest('Wejście')->first();
        
        // Sprawdź, czy znaleziono obecność
        if ($obecnosc) {
            // Sprawdź, czy pole "Wyjście" jest puste
            if ($obecnosc->Wyjście === null) {
                // Ustaw czas wyjścia na aktualny czas
                $obecnosc->Wyjście = Carbon::now();
                $obecnosc->save();
            
                return response()->json($obecnosc);
            } else {
                return response()->json(['message' => 'Pracownik już opuścił miejsce pracy.'], 400);
            }
        } else {
            return response()->json(['message' => 'Nie znaleziono obecności dla pracownika o podanym identyfikatorze.'], 404);
        }
    }

}