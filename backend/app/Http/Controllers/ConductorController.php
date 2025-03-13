<?php
namespace App\Http\Controllers;

use App\Models\Conductor;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException as ValidationValidationException;

class ConductorController extends Controller
{
    public function index()
    {
         // Obtén todos los propietarios de la base de datos
         $conductores = Conductor::all();

         // Devuelve los datos como JSON al frontend
         return response()->json($conductores, 200);
    }

    public function store(Request $request)
    {
        try {
            // Validar los datos recibidos
            $validatedData = $request->validate([
                'cedula' => 'required|string|max:20|unique:conductors,cedula',
                'primer_nombre' => 'required|string|max:255',
                'segundo_nombre' => 'nullable|string|max:255',
                'apellidos' => 'required|string|max:255',
                'direccion' => 'required|string|max:255',
                'telefono' => 'required|string|max:20',
                'ciudad' => 'required|string|max:255',
            ]);
    
            // Guardar los datos en la base de datos
            $conductor = Conductor::create($validatedData);
    
            // Devolver una respuesta exitosa
            return response()->json([
                'message' => 'Conductor registrado exitosamente.',
                'conductor' => $conductor,
            ], 201);
    
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Verificar si el error es por unicidad de la cédula
            if (isset($e->errors()['cedula'])) {
                return response()->json([
                    'message' => 'No se puede registrar el conductor porque la cédula ya existe.',
                    'errors' => $e->errors(),
                ], 422);
            }
    
            // Otros errores de validación
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $e->errors(),
            ], 422);
    
        } catch (\Exception $e) {
            // Responder con un error general
            return response()->json([
                'message' => 'Error interno del servidor.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

public function show(string $cedula)
{
    try {
        // Busca al conductor usando la cédula
        $conductor = Conductor::findOrFail($cedula);

        // Devuelve los datos en formato JSON
        return response()->json([
            'mensaje' => 'Datos obtenidos con éxito.',
            'data' => $conductor
        ], 200);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json([
            'mensaje' => 'Conductor no encontrado.'
        ], 404);
    } catch (\Exception $e) {
        return response()->json([
            'mensaje' => 'Error al obtener los datos.',
            'error' => $e->getMessage()
        ], 500);
    }
}

public function update(Request $request, $cedula)
{
    // Validar los datos del formulario
    $validatedData = $request->validate([
        'cedula' => 'required|string|max:20|unique:conductors,cedula,' . $cedula . ',cedula', // Excluye la cédula actual
        'primer_nombre' => 'string|max:50',
        'segundo_nombre' => 'nullable|string|max:50',
        'apellidos' => 'string|max:50',
        'direccion' => 'string|max:100',
        'telefono' => 'string|max:20',
        'ciudad' => 'string|max:50',
    ]);

    try {
        // Buscar al conductor por la cédula original (de la URL)
        $conductor = Conductor::findOrFail($cedula);

        // Actualizar los datos, incluyendo la cédula
        $conductor->update($validatedData);

        return response()->json([
            'mensaje' => 'Conductor actualizado con éxito.',
            'data' => $conductor
        ], 200);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json([
            'mensaje' => 'Conductor no encontrado.'
        ], 404);
    } catch (\Exception $e) {
        return response()->json([
            'mensaje' => 'Ocurrió un error al actualizar.',
            'error' => $e->getMessage()
        ], 500);
    }
}

    public function destroy(Conductor $conductor)
    {
        $conductor->delete();
        return response()->json(['message' => 'Conductor eliminado']);
    }
}