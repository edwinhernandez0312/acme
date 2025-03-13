<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{

    use HasFactory;

      protected $primaryKey = 'placa';

      public $incrementing = false;
  
      protected $keyType = 'string';
  

    protected $fillable = [
        'placa',
        'color',
        'marca',
        'tipo',
        'cedula_conductor', 
        'cedula_propietario', 
    ];

    /**
     * Get the conductor that owns the vehicle.
     */
    public function conductor()
    {
        return $this->belongsTo(Conductor::class, 'cedula_conductor', 'cedula');
    }

    /**
     * Get the propietario that owns the vehicle.
     */
    public function propietario()
    {
        return $this->belongsTo(Propietario::class, 'cedula_propietario', 'cedula');
    }
}
