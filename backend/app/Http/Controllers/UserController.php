<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function createUser(Request $request)
    {
        // Validar los datos recibidos
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Crear el usuario en la base de datos
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => $validatedData['password'], 
        ]);

        // Devuelve una respuesta JSON
        return response()->json([
            'message' => 'Usuario registrado correctamente.',
            'user' => $user, 
        ], 201);
    }

    public function login(Request $request)
    {
        // Validar los datos enviados
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
    
        // Intentar autenticar al usuario
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Credenciales incorrectas.',
            ], 401);
        }
    
        // Obtener el usuario autenticado
        $user = Auth::user();
    
        // Crear un token para el usuario
        $token = $user->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'message' => 'Inicio de sesión exitoso.',
        ]);
    }

}