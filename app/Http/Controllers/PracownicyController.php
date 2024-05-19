<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pracownicy;
use App\Models\Stanowisko;
use App\Models\PracownicyHasStanowisko;
use Illuminate\Support\Facades\DB;

class PracownicyController extends Controller
{
    public function Pracownicy()
    {
        $pracownicy = DB::select("
            SELECT 
                Pracownicy.Pracownicy_id,
                Pracownicy.Stanowisko_id,
                Pracownicy.Grupy_id,
                Pracownicy.email,
                Pracownicy.imie,
                Pracownicy.nazwisko,
                Pracownicy.konto_aktywne,
                Pracownicy.ilosc_dni_urlopu,
                Pracownicy.Data_edycji,
                Pracownicy.Data_utworzenia,
                Karta_dostepu.Karta_Dostepu_id,
                Karta_dostepu.numer_seryjny,
                Karta_dostepu.data_wydania
            FROM 
                Pracownicy
            LEFT JOIN 
                Karta_dostepu
            ON 
                Pracownicy.Pracownicy_id = Karta_dostepu.Pracownicy_id
        ");


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
