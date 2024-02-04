<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'pseudo' => "required|unique:users,pseudo|max:54",
            "email" => "required|email|unique:users,email",
            "password" => "required|min:4"
        ]);

        if($validator->fails()){
            return response()->json([
                'errors' => $validator->messages(),
                "message" => "Erreur du formulaire."
            ]);
        } else{
            $user = User::create([
                'pseudo'=> $request->input('pseudo'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input("password")),
                'email_verified_at' => now(),
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'toker' => $token,
                'type' => 'Bearer',
                'status' => 200,
                "message" => "L'utilisateur a été ajouté."
            ]);
        }
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            "email" => "required|email|exists:users,email",
            "password" => "required"
        ]);

        if($validator->fails()){
            return response()->json([
                'errors' => $validator->messages(),
                "message" => "Erreur du formulaire."
            ]);
        } else if(!Auth::attempt($request->only('email', 'password'))){
            return response()->json([
                'message'=>'Identifiants incorrects',
                'status'=>401
            ]);
        } else {
            $user = User::where('email', $request->input('email'))->firstOrFail();
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'token'=>$token,
                'type'=>"Bearer",
                'status' => 200,
                'message' => 'Connexion réussie',
            ])->cookie('jwt', $token);           
        }
    }

    public function user(Request $request){
        return $request->user();
    }
}
