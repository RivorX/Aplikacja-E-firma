<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Aktualnosci;

class AktualnosciController extends Controller
{
    public function Aktualnosci()
    {
        $Aktualnosci = Aktualnosci::limit(6)->get();

        if ($Aktualnosci->isEmpty()) {
            return response()->json(['message' => 'Brak aktualności'], 404);
        }

        return response()->json(['Aktualnosci' => $Aktualnosci]);
    }

    // Read - wyświetlenie pojedynczej aktualności
    public function show_id($id)
    {
        $news = Aktualnosci::find($id);
        if (!$news) {
            return response()->json(['message' => 'Aktualność nie znaleziona'], 404);
        }
        return response()->json(['news' => $news]);
    }
    public function show()
    {
        $news = Aktualnosci::get();
        if ($news->isEmpty()) {
            return response()->json(['message' => 'Aktualność nie znaleziona'], 404);
        }
        return response()->json(['news' => $news]);
    }

    // Create - dodanie nowej aktualności
    public function store(Request $request)
{
    // Ustaw obecną datę jako datę nadania
    $data_nadania = date('Y-m-d H:i:s');

    // Walidacja danych wejściowych
    $validatedData = $request->validate([
        'tytul' => 'required',
        'opis' => 'required',
    ]);

    // Dodaj datę nadania do walidowanych danych
    $validatedData['data_nadania'] = $data_nadania;

    // Utwórz nową aktualność
    $news = Aktualnosci::create($validatedData);

    // Zwróć odpowiedź JSON z informacją o sukcesie i nową aktualnością
    return response()->json(['message' => 'Aktualność dodana', 'news' => $news], 201);
}

    // Update - aktualizacja istniejącej aktualności
    public function update(Request $request, $id)
    {
        // Znajdź aktualność do aktualizacji
        $news = Aktualnosci::find($id);
        if (!$news) {
            return response()->json(['message' => 'Aktualność nie znaleziona'], 404);
        }

        // Ustaw obecną datę jako datę nadania
        $data_nadania = date('Y-m-d H:i:s');

        // Walidacja danych wejściowych
        $validatedData = $request->validate([
            'tytul' => 'required',
            'opis' => 'required',
        ]);

        // Dodaj obecną datę do walidowanych danych
        $validatedData['data_nadania'] = $data_nadania;

        // Zaktualizuj aktualność
        $news->update($validatedData);

        // Zwróć odpowiedź JSON z informacją o sukcesie oraz zaktualizowaną aktualnością
        return response()->json(['message' => 'Aktualność zaktualizowana', 'news' => $news]);
    }

    // Delete - usunięcie aktualności
    public function destroy($id)
    {
        $news = Aktualnosci::find($id);
        if (!$news) {
            return response()->json(['message' => 'Aktualność nie znaleziona'], 404);
        }
        $news->delete();
        return response()->json(['message' => 'Aktualność usunięta']);
    }
}
