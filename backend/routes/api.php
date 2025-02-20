<?php

use App\Http\Controllers\ApprovalLevelController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CustomerDocumentController;
use App\Http\Controllers\CustomerSiteController;
use App\Http\Controllers\DailyConsumptionController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DesignationController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\RoleController;
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
        Route::apiResource('customers', CustomerController::class);
        Route::apiResource('customer_sites', CustomerSiteController::class);
        Route::apiResource('customer_documents', CustomerDocumentController::class);
        Route::put('customer_documents/update', [CustomerDocumentController::class, 'update'])->name('customer_documents.update_by_cus_site');
        Route::get('customer_documents/show', [CustomerDocumentController::class, 'show'])->name('customer_documents.show_by_cus_site');
        Route::apiResource('daily_consumptions', DailyConsumptionController::class);
        Route::apiResource('roles', RoleController::class);
        Route::apiResource('approval_levels', ApprovalLevelController::class);
    });
});
