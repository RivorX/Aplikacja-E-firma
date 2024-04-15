<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->Pracownik();
});

Route::post('/adduser', [AuthController::class, 'adduser']);
Route::post('/login', [AuthController::class, 'login']);