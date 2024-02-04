<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/users', [UserController::class, "index"]);
Route::get('/user/{id}', [UserController::class, "show"]);
Route::put('/user/{id}/update', [UserController::class, "update"]);
Route::delete('/user/{id}/delete', [UserController::class, "delete"]);
Route::post('/users/store', [UserController::class, "store"]);

Route::post('/register', [AuthController::class, "register"]);
Route::post('/login', [AuthController::class, "login"]);

Route::get('/user/{id}/check', [UserController::class, "checkUser"]);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    Route::get('/user', [AuthController::class, "user"]);
});
