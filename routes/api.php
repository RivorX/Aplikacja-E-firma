<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\GuestNewsInfo;

Route::get('/pracownik', function (Request $request) {
    return $request->pracownik();
})->middleware('auth:sanctum');

Route::post('adduser', [AuthController::class, 'adduser']);
Route::post('login', [AuthController::class, 'login']);
Route::get('positions', [AuthController::class, 'positions']);
Route::get('GuestNewsInfo', [GuestNewsInfo::class, 'NewsInfo']);