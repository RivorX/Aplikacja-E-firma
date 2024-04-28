<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pracownicy;
use App\Models\Stanowisko;
use App\Models\PracownicyHasStanowisko;

class PracownicyController extends Controller
{
    public function Pracownicy()
    {
        $pracownicy = Pracownicy::get();

        if ($pracownicy->isEmpty()) {
            return response()->json(['message' => 'Brak pracowników'], 404);
        }

        return response()->json(['pracownicy' => $pracownicy]);
    }

    public function show($id)
    {
        $pracownik = Pracownicy::find($id);
        
        if (!$pracownik) {
            return response()->json(['message' => 'Pracownik nie znaleziony'], 404);
        }

        return response()->json(['pracownik' => $pracownik]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'imie' => 'required',
            'nazwisko' => 'required',
            'stanowisko_id' => 'required|exists:stanowisko,id',
            'pensja' => 'required|numeric',
        ]);

        $pracownik = Pracownicy::create($validatedData);

        return response()->json(['message' => 'Pracownik dodany', 'pracownik' => $pracownik], 201);
    }

    public function update(Request $request, $id)
    {
        $pracownik = Pracownicy::find($id);

        if (!$pracownik) {
            return response()->json(['message' => 'Pracownik nie znaleziony'], 404);
        }

        $validatedData = $request->validate([
            'imie' => 'required',
            'nazwisko' => 'required',
            'stanowisko_id' => 'required|exists:stanowisko,id',
            'pensja' => 'required|numeric',
        ]);

        $pracownik->update($validatedData);

        return response()->json(['message' => 'Pracownik zaktualizowany', 'pracownik' => $pracownik]);
    }

    public function destroy($id)
    {
        $pracownik = Pracownicy::find($id);

        if (!$pracownik) {
            return response()->json(['message' => 'Pracownik nie znaleziony'], 404);
        }

        $pracownik->delete();

        return response()->json(['message' => 'Pracownik usunięty']);
    }
}
