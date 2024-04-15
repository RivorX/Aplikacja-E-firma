<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddUserRequest;
use App\Http\Requests\LoginRequest;
use App\Models\Pracownicy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function adduser(AddUserRequest $request)    // Rejestracja nowego użytkownika TODO: dodać walidację
    {
        $data = $request->validated();

        $user = Pracownicy::create([
            'imie' => $data['firstname'],
            'nazwisko' => $data['lastname'],
            'email' => $data['email'],
            'haslo' => bcrypt($data['password']),
            'Grupy_id' => $data['group'],
            'stanowisko' => $data['position'],
            'konto_aktywne' => 1,
            'ilosc_dni_urlopu' => 0,
        ]); 
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(LoginRequest $request)    // Logowanie użytkownika TODO: dodać walidację
    {
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false; 
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response()->json([
                'error' => 'The proviede creadentials are not correct.'
            ], 422);

        } 
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }
    public function logout(Request $request)    // Wylogowanie użytkownika
    {
        /** @var User $user */
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response()->json([
            'success' => true
        ]);
    }
}
