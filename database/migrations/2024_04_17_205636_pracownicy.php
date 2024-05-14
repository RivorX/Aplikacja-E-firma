<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pracownicy', function (Blueprint $table) {
            $table->increments('Pracownicy_id');
            $table->integer('Stanowisko_id')->unsigned();
            $table->integer('Grupy_id')->unsigned();
            $table->string('email', 45);
            $table->string('password', 100);
            $table->string('imie', 45);
            $table->string('nazwisko', 45);
            $table->boolean('konto_aktywne');
            $table->integer('ilosc_dni_urlopu');
            $table->datetime('Data_edycji')->nullable();
            $table->datetime('Data_utworzenia');
            
            // Definicja kluczy obcych
            $table->foreign('Stanowisko_id')->references('Stanowisko_id')->on('Stanowisko')->onDelete('cascade');
            $table->foreign('Grupy_id')->references('Grupy_id')->on('Grupy')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pracownicy');
    }
};
