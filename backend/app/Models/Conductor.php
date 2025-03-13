<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conductor extends Model
{

    use HasFactory;
    protected $primaryKey = 'cedula';
public $incrementing = false; // La cédula no es auto-incremental
protected $keyType = 'string'; // La cédula es un string

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
     * Get the vehicles for the conductor.
     */
    public function vehiculos()
    {
        return $this->hasMany(Vehiculo::class, 'cedula_conductor', 'cedula');
    }
}
