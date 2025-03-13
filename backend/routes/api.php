<?php

use App\Http\Controllers\ConductorController;
use App\Http\Controllers\PropietarioController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehiculoController;
use App\Models\Vehiculo;
use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;

Route::post('/login', [UserController::class, 'login']);

Route::post('/register', [UserController::class, 'createUser']);


// Ruta original de propietarios
Route::apiResource('propietarios', PropietarioController::class);


Route::apiResource('conductores', ConductorController::class);

Route::apiResource('vehiculos', VehiculoController::class);

