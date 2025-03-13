<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Propietario extends Model
{

    use HasFactory;

    protected $primaryKey = 'cedula'; // Establece 'cedula' como clave primaria
    public $incrementing = false; // Indica que no es un número auto-incremental
    protected $keyType = 'string';

    protected $fillable = [
        'cedula',
        'primer_nombre',
        'segundo_nombre',
        'apellidos',
        'direccion',
        'telefono',
        'ciudad',
    ];


    /**
     * Get the vehicles for the propietario.
     */
    public function vehiculos()
    {
        return $this->hasMany(Vehiculo::class, 'cedula_propietario', 'cedula');
    }
}
