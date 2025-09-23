<?php

use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BehavioralIndicator\BehavioralIndicatorController;
use App\Http\Controllers\Competency\CompetencyController;
use App\Http\Controllers\Competency\TypesController;
use App\Http\Controllers\JobFamily\JobFamilyController;
use App\Http\Controllers\Office\OfficeController;
use App\Http\Controllers\UtilsController;
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

    // ACCOUNT
    Route::get('/admin/account-create', [AccountController::class , 'create'])->name('account.create');

    // COMPETENCY TYPES
    Route::get('/competency-types', [TypesController::class , 'index'])->name('competencies.types.index');

    // JOB FAMILY
    Route::post('/job-families/store', [JobFamilyController::class , 'store'])->name('job-families.store');
    Route::get('/job-families/{jobFamilyId}', [JobFamilyController::class , 'show'])->name('job-families.show');

    // JOB FAMILY -> COMPETENCY
    Route::get('/job-families/{jobFamilyId}/competencies/form', [CompetencyController::class , 'create'])->name('competencies.create');
    Route::get('/job-families/{jobFamilyId}/competencies/{competencyId}', [CompetencyController::class , 'edit'])->name('competencies.edit');
    Route::post('/job-families/competency/store', [CompetencyController::class , 'store'])->name('competency.store');
    Route::post('/job-families/competency/update', [CompetencyController::class , 'update'])->name('competency.update');
    Route::delete('/job-families/competency/delete', [CompetencyController::class , 'delete'])->name('competency.delete');

    // BEHAVIORAL INDICATOR
    Route::post('/behavioral-indicator/update', [BehavioralIndicatorController::class , 'update'])->name('behavioral-indicator.update');
    Route::delete('/behavioral-indicator/delete', [BehavioralIndicatorController::class , 'delete'])->name('behavioral-indicator.delete');
    Route::post('/behavioral-indicator/store', [BehavioralIndicatorController::class , 'store'])->name('behavioral-indicator.store');
    Route::post('/behavioral-indicator/reorder', [BehavioralIndicatorController::class , 'reorder'])->name('behavioral-indicator.reorder');
  
    // Offices
    Route::post('/offices', [OfficeController::class, 'store'])->name('offices.store');
    Route::put('/offices/{office}', [OfficeController::class, 'update'])->name('offices.update');
    Route::delete('/offices/{office}', [OfficeController::class, 'destroy'])->name('offices.delete');


    // SPMS
    Route::get('/spms-accounts/search', [UtilsController::class, 'search'])
    ->name('spms-accounts.search');

});

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
