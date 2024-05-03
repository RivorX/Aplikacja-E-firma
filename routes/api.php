<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\AktualnosciController;
use App\Http\Controllers\GuestNewsInfoController;
use App\Http\Controllers\OgloszeniaController;
use App\Http\Controllers\PracownicyController;

Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

Route::post('adduser', [AuthController::class, 'adduser']);
Route::post('login', [AuthController::class, 'login']);

Route::get('positions', [AuthController::class, 'positions']);
Route::get('stanowisko', [AuthController::class, 'positions']);
Route::get('aktualnosci', [AktualnosciController::class, 'Aktualnosci']);

// Aktualnosci
Route::middleware('auth:sanctum')->group(function () {
    // Tylko dla admina
    Route::get('aktualnosci_admin', [AktualnosciController::class, 'showALL']);
    Route::get('aktualnosci/{id}', [AktualnosciController::class, 'show_id']);
    Route::post('aktualnosci', [AktualnosciController::class, 'store']);
    Route::put('aktualnosci/{id}', [AktualnosciController::class, 'update']);
    Route::delete('aktualnosci/{id}', [AktualnosciController::class, 'destroy']);
});

// Ogłoszenia
Route::middleware('auth:sanctum')->group(function () {
    Route::get('ogloszenia/{Stanowisko_id}', [OgloszeniaController::class, 'Ogloszenia']);
    // Tylko dla admina
    Route::get('ogloszenia_admin', [OgloszeniaController::class, 'show_ALL']);
    Route::get('ogloszenia_up/{id}', [OgloszeniaController::class, 'show_id']);
    Route::post('ogloszenia', [OgloszeniaController::class, 'store']);
    Route::put('ogloszenia/{id}', [OgloszeniaController::class, 'update']);
    Route::delete('ogloszenia/{id}', [OgloszeniaController::class, 'destroy']);
});

// Pracownicy
Route::middleware('auth:sanctum')->group(function () {
    //Route::get('pracownicy', [PracownicyController::class, 'Pracownicy']);
    // Tylko dla admina
    Route::get('pracownicy_admin', [PracownicyController::class, 'Pracownicy']);
    Route::get('pracownicy/{id}', [PracownicyController::class, 'show']);
    Route::post('pracownicy', [PracownicyController::class, 'store']);
    Route::put('pracownicy/{id}', [PracownicyController::class, 'update']);
    Route::delete('pracownicy/{id}', [PracownicyController::class, 'destroy']);
});