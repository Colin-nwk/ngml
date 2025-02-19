<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function() {
    Route::get('/test', function () {
        return ["message"=> "test successful"];
    });
    Route::get('auth/initialize', [AuthController::class, 'initialize']);
    Route::post('auth/callback', [AuthController::class, 'callback']);
    Route::middleware(['auth:sanctum'])->group(function () {

    });
});
