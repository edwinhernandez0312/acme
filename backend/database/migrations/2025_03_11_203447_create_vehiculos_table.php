<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehiculos', function (Blueprint $table) {
            $table->string('placa')->primary();
            $table->string('color', 50);
            $table->string('marca', 50);
            $table->string('tipo', 20); // Particular o Público
            $table->string('cedula_conductor', 20);
            $table->string('cedula_propietario', 20);
            $table->foreign('cedula_conductor')->references('cedula')->on('conductors')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('cedula_propietario')->references('cedula')->on('propietarios')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehiculos');
    }
};
