<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\AktualnosciController;
use App\Http\Controllers\GuestNewsInfoController;
use App\Http\Controllers\OgloszeniaController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

Route::post('adduser', [AuthController::class, 'adduser']);
Route::post('login', [AuthController::class, 'login']);


Route::get('positions', [AuthController::class, 'positions']);
Route::get('GuestNewsInfo', [AktualnosciController::class, 'Aktualnosci']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('aktualnosci', [AktualnosciController::class, 'Aktualnosci']);
    Route::get('aktualnosci_admin', [AktualnosciController::class, 'show']);
    Route::get('aktualnosci/{id}', [AktualnosciController::class, 'show_id']);
    Route::post('aktualnosci', [AktualnosciController::class, 'store']);
    Route::put('aktualnosci/{id}', [AktualnosciController::class, 'update']);
    Route::delete('aktualnosci/{id}', [AktualnosciController::class, 'destroy']);
});
Route::get('GuestNewsInfo', [GuestNewsInfoController::class, 'GuestNewsInfo']);

Route::get('Ogłoszenia', [OgloszeniaController::class, 'Ogloszenia']);