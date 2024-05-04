<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('drzwi', function (Blueprint $table) {
        $table->id();
        $table->integer('Drzwi_id_Podstawowy');
        $table->string('nr_drzwi', 45);
        $table->string('nazwa', 45);
        $table->string('WeWy', 45);
        $table->integer('Strefy_Dostepu_id_Indeks');
        $table->boolean('drzwi_aktywne');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
