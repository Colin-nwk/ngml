<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DesignationController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function() {
    Route::get('/test', function () {
        return ["message"=> "test successful"];
    });

    Route::get('auth/initialize', [AuthController::class, 'initialize']);
    Route::post('auth/callback', [AuthController::class, 'callback']);
    Route::get('/login', [AuthController::class, 'loginError'])->name('login');

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::apiResource('departments', DepartmentController::class);
        Route::apiResource('locations', LocationController::class);
        Route::apiResource('designations', DesignationController::class);
        Route::apiResource('units', UnitController::class);
        Route::apiResource('users', UserController::class);
    });
});
