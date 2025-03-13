<?php

namespace App\Http\Controllers;

use App\Models\Vehiculo;
use Illuminate\Http\Request;

class VehiculoController extends Controller
{
    public function index()
    {
        try {
            // Obtén los vehículos con sus relaciones de conductor y propietario
            $vehiculos = Vehiculo::with(['conductor', 'propietario'])->get();
    
            // Retorna los datos como JSON
            return response()->json($vehiculos, 200);
        } catch (\Exception $e) {
            // Manejo de errores
            return response()->json([
                'mensaje' => 'Error al obtener los vehículos.',
                'error' => $e->getMessage(),
            ], 500);
        }
    
    }

  public function show($placa)
{
    try {
        // Buscar el vehículo por su placa
        $vehiculo = Vehiculo::where('placa', $placa)->firstOrFail();

        // Retornar la información del vehículo en formato JSON
        return response()->json([
            'mensaje' => 'Información del vehículo obtenida exitosamente.',
            'data' => $vehiculo
        ], 200);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        // Si el vehículo no se encuentra
        return response()->json([
            'mensaje' => 'El vehículo con la placa especificada no fue encontrado.',
            'error' => $e->getMessage()
        ], 404);
    } catch (\Exception $e) {
        // Otros errores generales
        return response()->json([
            'mensaje' => 'Ocurrió un error al obtener la información del vehículo.',
            'error' => $e->getMessage()
        ], 500);
    }
}

    public function store(Request $request)
    {
        try {
            // Validar los datos enviados desde el cliente
            $validatedData = $request->validate([
                'placa' => 'required|string|max:20|unique:vehiculos,placa',
                'color' => 'required|string|max:50',
                'marca' => 'required|string|max:50',
                'tipo' => 'required|string|in:Particular,Público',
                'cedula_conductor' => 'required|exists:conductors,cedula', // Relación con cédula del conductor
                'cedula_propietario' => 'required|exists:propietarios,cedula', // Relación con cédula del propietario
            ]);

            // Crear el nuevo registro de vehículo
            $vehiculo = Vehiculo::create($validatedData);
            $vehiculo->save();
            // Retornar respuesta exitosa
            return response()->json([
                'mensaje' => 'Vehículo registrado exitosamente.',
                'vehiculo' => $vehiculo,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Manejar errores de validación
            return response()->json([
                'mensaje' => 'Error de validación.',
                'errores' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // Manejar errores generales
            return response()->json([
                'mensaje' => 'Error interno del servidor.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function update(Request $request, $placa)
{
    try {
        // Buscar el vehículo por su placa
        $vehiculo = Vehiculo::where('placa', $placa)->firstOrFail();

        // Validar los datos del request
        $validatedData = $request->validate([
            'placa' => 'required|string|max:10|unique:vehiculos,placa,' . $placa . ',placa',
            'color' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'tipo' => 'required|string|in:Particular,Público',
            'cedula_conductor' => 'required|exists:conductors,cedula',
            'cedula_propietario' => 'required|exists:propietarios,cedula',
        ]);

        // Actualizar los datos del vehículo
        $vehiculo->update($validatedData);

        // Respuesta exitosa
        return response()->json([
            'mensaje' => 'El vehículo se ha actualizado correctamente.',
            'data' => $vehiculo,
        ], 200);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        // Si el vehículo no se encuentra
        return response()->json([
            'mensaje' => 'El vehículo con la placa especificada no fue encontrado.',
            'error' => $e->getMessage(),
        ], 404);
    } catch (\Illuminate\Validation\ValidationException $e) {
        // Si hay errores de validación
        return response()->json([
            'mensaje' => 'Errores de validación detectados.',
            'errores' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        // Otros errores generales
        return response()->json([
            'mensaje' => 'Ocurrió un error al actualizar el vehículo.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

}

