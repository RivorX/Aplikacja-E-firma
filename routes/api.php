<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\AktualnosciController;
use App\Http\Controllers\GuestNewsInfoController;
use App\Http\Controllers\OgloszeniaController;
use App\Http\Controllers\PracownicyController;
use App\Http\Controllers\KartaDostepuController;
use App\Http\Controllers\DrzwiController;
use App\Http\Controllers\StrefyDostepuController;
use App\Http\Controllers\AdresZamieszkaniaController;
use App\Http\Controllers\BudynkiController;
use App\Http\Controllers\ObecnoscPracownikowController;
use App\Http\Controllers\QrCodeController;
use App\Http\Controllers\LogiKartController;

Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/logout', [AuthController::class, 'logout']);
    Route::post('/obecnosc', [ObecnoscPracownikowController::class, 'store']);
    Route::put('/obecnosc/{id}', [ObecnoscPracownikowController::class, 'update']);
    Route::get('/me', [AuthController::class, 'me']);
});

Route::post('adduser', [AuthController::class, 'adduser']);
Route::post('login', [AuthController::class, 'login']);

Route::get('positions', [AuthController::class, 'positions']);
Route::get('stanowisko', [AuthController::class, 'positions']);
Route::get('aktualnosci', [AktualnosciController::class, 'Aktualnosci']);
Route::post('change-password', [AuthController::class, 'changePassword']);


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

// Karty dostępu
Route::middleware('auth:sanctum')->group(function () {
    Route::get('karty_dostepu_admin', [KartaDostepuController::class, 'getAll']);
    Route::put('karty_dostepu/{id}/change-status', [KartaDostepuController::class, 'changeCardStatus']);
    Route::get('karty_dostepu/{id}', [KartaDostepuController::class, 'getById']);
    Route::get('karty_dostepu/{id}/pracownik', [KartaDostepuController::class, 'getByPracownicyId']);
    Route::post('karty_dostepu', [KartaDostepuController::class, 'store']);
    Route::put('karty_dostepu/{id}', [KartaDostepuController::class, 'update']);
    Route::delete('karty_dostepu/{id}', [KartaDostepuController::class, 'destroy']);
});

// Drzwi
Route::middleware('auth:sanctum')->group(function () {
    Route::get('drzwi/{id}', [DrzwiController::class, 'show']);
    Route::get('drzwi', [DrzwiController::class, 'index']);
    Route::post('drzwi', [DrzwiController::class, 'store']);
    Route::put('drzwi/{id}', [DrzwiController::class, 'update']);
    Route::delete('drzwi/{id}', [DrzwiController::class, 'destroy']);
});

// Strefy dostępu
Route::middleware('auth:sanctum')->group(function () {
    Route::get('strefy-dostepu/{id}', [StrefyDostepuController::class, 'show']);
    Route::get('strefy-dostepu', [StrefyDostepuController::class, 'index']);
    Route::post('strefy-dostepu', [StrefyDostepuController::class, 'store']);
    Route::put('strefy-dostepu/{id}', [StrefyDostepuController::class, 'update']);
    Route::delete('strefy-dostepu/{id}', [StrefyDostepuController::class, 'destroy']);
});


// Adresy zamieszkania
Route::middleware('auth:sanctum')->group(function () {
    Route::get('adresy-zamieszkania', [AdresZamieszkaniaController::class, 'index']);
    Route::get('adresy-zamieszkania/{id}', [AdresZamieszkaniaController::class, 'show']); 
    Route::get('adresy-zamieszkania/{id}/pracownik', [AdresZamieszkaniaController::class, 'show_pracownik_id']); 
    Route::post('adresy-zamieszkania', [AdresZamieszkaniaController::class, 'store']);
    Route::put('adresy-zamieszkania/{id}', [AdresZamieszkaniaController::class, 'update']);
    Route::delete('adresy-zamieszkania/{id}', [AdresZamieszkaniaController::class, 'destroy']);
});


// Budynki
Route::middleware('auth:sanctum')->group(function () {
    Route::get('budynki', [BudynkiController::class, 'index']);
    Route::post('budynki', [BudynkiController::class, 'store']);
    Route::get('budynki/{id}', [BudynkiController::class, 'show']);
    Route::put('budynki/{id}', [BudynkiController::class, 'update']);
    Route::delete('budynki/{id}', [BudynkiController::class, 'destroy']);
});


//QRcode

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/qrcode/download', [QrCodeController::class, 'download']);
    Route::get('/qrcode/{door_id}', [QrCodeController::class, 'generateQRCode']);
    Route::post('/qrcodeCheckAccess', [QrCodeController::class, 'qrcodeCheckAccess']);
});

//Raporty
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logs/card', [LogiKartController::class, 'cardLogsReport']);
});
