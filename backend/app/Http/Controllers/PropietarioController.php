<?php

namespace App\Http\Controllers;

use App\Models\Propietario;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException as ValidationValidationException;

class PropietarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtén todos los propietarios de la base de datos
        $propietarios = Propietario::all();

        // Devuelve los datos como JSON al frontend
        return response()->json($propietarios, 200);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Captura los datos enviados desde Angular
            $receivedData = $request->all();
    
            // Valida los datos
            $receivedData = $request->validate([
                'cedula' => 'required|string|max:20|unique:propietarios,cedula',
                'primer_nombre' => 'required|string|max:255',
                'segundo_nombre' => 'nullable|string|max:255',
                'apellidos' => 'required|string|max:255',
                'direccion' => 'required|string|max:255',
                'telefono' => 'required|string|max:20',
                'ciudad' => 'required|string|max:255',
            ]);
    
            // Guarda los datos en la base de datos
            $propietario = Propietario::create($receivedData);
            $propietario->save();
    
            // Devuelve la respuesta exitosa
            return response()->json([
                'message' => 'Propietario registrado exitosamente.',
                'propietario' => $propietario,
            ], 201);
    
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Verificar si el error es por la cédula duplicada
            if (isset($e->errors()['cedula'])) {
                return response()->json([
                    'message' => 'No se puede registrar el propietario porque la cédula ya existe.',
                    'errors' => $e->errors(),
                ], 422);
            }
    
            // Captura otros errores de validación
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $e->errors(),
            ], 422);
    
        } catch (\Exception $e) {
            // Captura errores inesperados y responde con un error HTTP 500
            return response()->json([
                'message' => 'Error interno del servidor.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $cedula)
    {
        try {
            // Busca al propietario usando la cédula
            $propietario = Propietario::findOrFail($cedula);
    
            // Devuelve los datos en formato JSON
            return response()->json([
                'mensaje' => 'Datos obtenidos con éxito.',
                'data' => $propietario
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Si el propietario no existe, envía un error 404
            return response()->json([
                'mensaje' => 'Propietario no encontrado.'
            ], 404);
        } catch (\Exception $e) {
            // Maneja cualquier otro error
            return response()->json([
                'mensaje' => 'Error al obtener los datos.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Show the form for editing the specified resource.
     */


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $cedula)
    {
        // Validar los datos del formulario
        $validatedData = $request->validate([
          'cedula' => 'required|string|max:20|unique:propietarios,cedula,' . $cedula . ',cedula',
            'primer_nombre' => 'string|max:50',
            'segundo_nombre' => 'nullable|string|max:50',
            'apellidos' => 'string|max:50',
            'direccion' => 'string|max:100',
            'telefono' => 'string|max:20',
            'ciudad' => 'string|max:50',
        ]);
    
        try {
            // Buscar al propietario por la cédula original (de la URL)
            $propietario = Propietario::findOrFail($cedula);
    
            // Actualizar los datos, incluyendo la cédula
            $propietario->update($validatedData);
    
            return response()->json([
                'mensaje' => 'Propietario actualizado con éxito.',
                'data' => $propietario
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'mensaje' => 'Propietario no encontrado.'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'mensaje' => 'Ocurrió un error al actualizar.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
