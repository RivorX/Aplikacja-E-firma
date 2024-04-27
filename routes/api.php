<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\GuestNewsInfoController;
use App\Http\Controllers\OgloszeniaController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

Route::post('adduser', [AuthController::class, 'adduser']);
Route::post('login', [AuthController::class, 'login']);


Route::get('positions', [AuthController::class, 'positions']);
Route::get('GuestNewsInfo', [GuestNewsInfoController::class, 'GuestNewsInfo']);

Route::get('Ogłoszenia', [OgloszeniaController::class, 'Ogloszenia']);