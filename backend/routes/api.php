<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('auth/initialize', [AuthController::class, 'initialize']);
Route::post('auth/callback', [AuthController::class, 'callback']);
