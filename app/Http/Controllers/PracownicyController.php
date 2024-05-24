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
                Karta_dostepu.data_wydania,
                Karta_dostepu.karta_aktywna
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
        $pracownik = Pracownicy::with(['stanowisko', 'grupa'])
            ->where('Pracownicy_id', $id)
            ->first();

        if (!$pracownik) {
            return response()->json(['message' => 'Pracownik nie znaleziony'], 404);
        }

        return response()->json(['pracownik' => $pracownik]);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            // Tworzenie nowego pracownika
            $validatedData = $request->validate([
                'imie' => 'required',
                'nazwisko' => 'required',
                'stanowisko_id' => 'required|exists:stanowisko,id',
                'pensja' => 'required|numeric',
            ]);
            $pracownik = Pracownicy::create($validatedData);

            // Jeśli wszystko jest w porządku, zatwierdzamy transakcję
            DB::commit();

            return response()->json(['message' => 'Pracownik dodany', 'pracownik' => $pracownik], 201);
        } catch (\Exception $e) {
            // W przypadku błędu, wycofujemy zmiany
            DB::rollback();
            return response()->json(['message' => 'Wystąpił błąd podczas dodawania pracownika'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        DB::beginTransaction();
    
        try {
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
    
            // Jeśli wszystko jest w porządku, zatwierdzamy transakcję
            DB::commit();
    
            return response()->json(['message' => 'Pracownik zaktualizowany', 'pracownik' => $pracownik]);
        } catch (\Exception $e) {
            // W przypadku błędu, wycofujemy zmiany
            DB::rollback();
            return response()->json(['message' => 'Wystąpił błąd podczas aktualizacji pracownika'], 500);
        }
    }
    
    public function change_status(Request $request, $id)
    {
        DB::beginTransaction();
    
        try {
            $pracownik = Pracownicy::find($id);
    
            if (!$pracownik) {
                return response()->json(['message' => 'Pracownik nie znaleziony'], 404);
            }
    
            // Zmiana statusu konta pracownika
            $pracownik->konto_aktywne = !$pracownik->konto_aktywne;
    
            // Zablokowanie wszystkich kart pracownika
            if (!$pracownik->konto_aktywne) {
                $karty = $pracownik->kartyDostepu;
                foreach ($karty as $karta) {
                    $karta->karta_aktywna = 0;
                    $karta->save();
                }
            }
    
            // Zapisanie zmian
            $pracownik->save();
    
            // Jeśli wszystko jest w porządku, zatwierdzamy transakcję
            DB::commit();
    
            return response()->json(['message' => 'Status konta pracownika zmieniony, zablokowano karty', 'pracownik' => $pracownik]);
        } catch (\Exception $e) {
            // W przypadku błędu, wycofujemy zmiany
            DB::rollback();
            return response()->json(['message' => 'Wystąpił błąd podczas zmiany statusu konta pracownika'], 500);
        }
    }
    


    public function destroy($id)
    {
        DB::beginTransaction();
    
        try {
            $pracownik = Pracownicy::find($id);
    
            if (!$pracownik) {
                return response()->json(['message' => 'Pracownik nie znaleziony'], 404);
            }
    
            $pracownik->delete();
    
            // Jeśli wszystko jest w porządku, zatwierdzamy transakcję
            DB::commit();
    
            return response()->json(['message' => 'Pracownik usunięty']);
        } catch (\Exception $e) {
            // W przypadku błędu, wycofujemy zmiany
            DB::rollback();
            return response()->json(['message' => 'Wystąpił błąd podczas usuwania pracownika'], 500);
        }
    }
    
}
