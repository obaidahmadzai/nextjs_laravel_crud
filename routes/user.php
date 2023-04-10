<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::get('/getuser', [UserController::class, 'index'])
    ->middleware('auth')
    ->name('getuser');
Route::get('/edituser/{id}', [UserController::class, 'show'])
    ->middleware('auth')
    ->name('edituser');
Route::put('/update', [UserController::class, 'update'])
    ->middleware('auth')
    ->name('update');
Route::post('/create', [UserController::class, 'store'])
    ->middleware('auth')
    ->name('create');

Route::get('/delete/{id}', [UserController::class, 'destroy'])
    ->middleware('auth')
    ->name('delete');
