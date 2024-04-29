<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ogloszenia;
use App\Models\Stanowisko;
use App\Models\OgloszeniaHasStanowisko;

class OgloszeniaController extends Controller
{
    public function Ogloszenia($Stanowisko_id)
    {
        $Ogloszenia = Ogloszenia::whereHas('stanowiska', function ($query) use ($Stanowisko_id) {
            $query->where('Stanowisko.Stanowisko_id', $Stanowisko_id);
        })->limit(6)->get();
    
        return response()->json(['Ogloszenia' => $Ogloszenia]);
    }
    
    // Read - wyświetlenie pojedynczej aktualności
    public function show_id($id)
    {
        // Znajdź ogłoszenie do edycji
        $ogloszenia = Ogloszenia::with('stanowiska')->find($id);

        if (!$ogloszenia) {
            return response()->json(['message' => 'Ogłoszenie nie znalezione'], 404);
        }

        return response()->json(['ogloszenia' => $ogloszenia]);
    }

    public function show_ALL()
    {
        $ogloszenia = Ogloszenia::with('stanowiska')->get();
        if ($ogloszenia->isEmpty()) {
            return response()->json(['message' => 'Aktualność nie znaleziona'], 404);
        }

        return response()->json(['ogloszenia' => $ogloszenia]);
    }


    // Create - dodanie nowej aktualności
    public function store(Request $request)
    {
        // Walidacja danych wejściowych
        $validatedData = $request->validate([
            'Pracownicy_id' => 'required',
            'tytul' => 'required',
            'opis' => 'required',
            'stanowiska_id' => 'required|array',
        ]);

        // Utwórz nowe ogłoszenie
        $ogloszenie = Ogloszenia::create([
            'Pracownicy_id' => $validatedData['Pracownicy_id'],
            'tytul' => $validatedData['tytul'],
            'opis' => $validatedData['opis'],
            'data_nadania' => now(),
        ]);

        // Przypisz wybrane stanowiska do nowego ogłoszenia
        $ogloszenie->stanowiska()->attach($validatedData['stanowiska_id']);

        // Zwróć odpowiedź JSON z informacją o sukcesie i nowym ogłoszeniu
        return response()->json(['message' => 'Ogłoszenie dodane', 'ogloszenie' => $ogloszenie], 201);
    }

    // Update - aktualizacja istniejącej aktualności
    public function update(Request $request, $id)
    {
        // Znajdź ogłoszenie do aktualizacji
        $ogloszenia = Ogloszenia::find($id);
        if (!$ogloszenia) {
            return response()->json(['message' => 'Ogłoszenie nie znaleziono'], 404);
        }

        // Walidacja danych wejściowych
        $validatedData = $request->validate([
            'tytul' => 'required',
            'opis' => 'required',
            'stanowiska_id' => 'required|array',
        ]);

        // Aktualizuj pola aktualności
        $ogloszenia->tytul = $validatedData['tytul'];
        $ogloszenia->opis = $validatedData['opis'];
        
        // Jeśli zostały przekazane stanowiska do aktualizacji, zaktualizuj je
        if (isset($validatedData['stanowiska_id'])) {
            $ogloszenia->stanowiska()->sync($validatedData['stanowiska_id']);
        }

        // Zaktualizuj ogłoszenie
        $ogloszenia->save();

        // Zwróć odpowiedź JSON z informacją o sukcesie oraz zaktualizowaną aktualnością
        return response()->json(['message' => 'Ogłoszenie zaktualizowanae', 'ogloszenia' => $ogloszenia]);
    }


    // Delete - usunięcie aktualności
    public function destroy($id)
    {
        try {
            // Usuwanie powiązanych rekordów z tabeli ogloszenia_has_stanowiska
            OgloszeniaHasStanowisko::where('Ogloszenia_id', $id)->delete();

            // Usuwanie głównego rekordu z tabeli Ogloszenia
            $ogloszenia = Ogloszenia::find($id);
            if (!$ogloszenia) {
                return response()->json(['message' => 'Ogłoszeń nie znaleziono'], 404);
            }
            $ogloszenia->delete();
            
            return response()->json(['message' => 'Ogłoszenie usunięte']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Wystąpił błąd podczas usuwania ogłoszenia: ' . $e->getMessage()], 500);
        }
    }
    
}
