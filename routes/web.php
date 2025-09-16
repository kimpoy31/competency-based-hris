<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Competency\TypesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'create'])->name('login');
    Route::post('/login', [AuthController::class, 'store'])->name('login.store');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('dashboard');


    // ADMIN
    Route::get('/admin', [AdminController::class , 'index'])->name('admin.index');


    // COMPETENCIES
    Route::get('/competency-types', [TypesController::class , 'index'])->name('competencies.types.index');

});

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
