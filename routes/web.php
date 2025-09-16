<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Competency\CompetencyController;
use App\Http\Controllers\Competency\TypesController;
use App\Http\Controllers\JobFamily\JobFamilyController;
use App\Models\JobFamily;
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

    // COMPETENCY TYPES
    Route::get('/competency-types', [TypesController::class , 'index'])->name('competencies.types.index');

    // JOB FAMILY
    Route::post('/job-families/store', [JobFamilyController::class , 'store'])->name('job-families.store');
    Route::get('/job-families/{jobFamilyId}', [JobFamilyController::class , 'show'])->name('job-families.show');

    // JOB FAMILY -> COMPETENCY
    Route::get('/job-families/{jobFamilyId}/competencies/create', [CompetencyController::class , 'create'])->name('competencies.create');
});

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
