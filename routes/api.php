<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\GuestNewsInfo;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('adduser', [AuthController::class, 'adduser']);
Route::post('login', [AuthController::class, 'login']);


Route::get('positions', [AuthController::class, 'positions']);
Route::get('GuestNewsInfo', [GuestNewsInfo::class, 'NewsInfo']);