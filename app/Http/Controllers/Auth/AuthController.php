<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\AddUserRequest;
use App\Http\Requests\LoginRequest;

// Modele używanie w bazie
use App\Models\Pracownicy;
use App\Models\Grupy;
use App\Models\Stanowisko;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function adduser(AddUserRequest $request)
    {
        // Walidacja żądania
        $data = $request->validated();

        // Sprawdzenie unikalności adresu email
        $existingUser = Pracownicy::where('email', $data['email'])->first();
        if ($existingUser) {
            return response()->json(['error' => 'Podany adres email jest już zajęty. Proszę podać inny adres email.'], 400);
        }

        // Rozpoczęcie transakcji
        DB::beginTransaction();

        try {
            // Sprawdzenie czy stanowisko istnieje, jeśli nie, utwórz nowe
            $position = Stanowisko::firstOrCreate(
                ['nazwa_stanowiska' => $data['position']],
                ['stawka_h' => 0]
            );

            // Utworzenie nowego użytkownika
            $pracownik = Pracownicy::create([
                'imie' => $data['imie'],
                'nazwisko' => $data['nazwisko'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
                'stanowisko_id' => $position->Stanowisko_id,
                'konto_aktywne' => 1,
                'ilosc_dni_urlopu' => 0,
            ]);

            // Sprawdzenie czy grupa "admin" istnieje, jeśli nie, utwórz nową
            $adminGroup = Grupy::firstOrCreate(['nazwa_grupy' => 'admin']);

            // Sprawdzenie czy grupa "pracownik" istnieje, jeśli nie, utwórz nową
            $employeeGroup = Grupy::firstOrCreate(['nazwa_grupy' => 'pracownik']);

            // Przypisanie użytkownika do grupy "admin"
            $pracownik->grupy()->attach($adminGroup->Grupy_id);

            // Przypisanie użytkownika do grupy "pracownik"
            $pracownik->grupy()->attach($employeeGroup->Grupy_id);

            // Utworzenie tokenu dla nowego użytkownika
            $token = $pracownik->createToken('main')->plainTextToken;

            // Zakończenie transakcji
            DB::commit();

            // Zwrócenie odpowiedzi
            return response()->json([
                'message' => 'Użytkownik został pomyślnie dodany.',
                'pracownik' => $pracownik,
                'token' => $token
            ], 201); // 201 - Created
        } catch (\Exception $e) {
            // W przypadku błędu, wycofanie transakcji
            DB::rollBack();

            // Zwrócenie odpowiedzi z błędem
            return response()->json(['error' => 'Wystąpił błąd podczas tworzenia użytkownika.'], 500);
        }
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        // Pobierz pracownika na podstawie adresu e-mail
        $pracownik = Pracownicy::where('email', $credentials['email'])->first();

        // Sprawdź, czy pracownik istnieje
        if (!$pracownik || !Hash::check($credentials['password'], $pracownik->password)) {
            return response()->json([
                'error' => 'Podane dane logowania są niepoprawne.'
            ], 422);
        }

        // Zaloguj pracownika
        Auth::login($pracownik);

        // Utwórz token dla pracownika
        $token = $pracownik->createToken('main')->plainTextToken;

        return response()->json([
            'pracownik_info' => $pracownik,
            'token' => $token
        ]);
    }


    public function logout(Request $request)
    {
        $pracownik = Auth::Pracownicy();
        // Unieważnij token użyty do uwierzytelnienia bieżącego żądania...
        $pracownik->currentAccessToken()->delete();

        return response()->json([
            'success' => true
        ]);
    }
}
