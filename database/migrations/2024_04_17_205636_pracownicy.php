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
        Schema::create('Pracownicy', function (Blueprint $table) {
            $table->bigIncrements('Pracownicy_id')->unsigned()->primary(); // Primary key with auto-incrementing unsigned integer
            $table->string('imie');
            $table->string('nazwisko');
            $table->string('email')->unique(); // Unique email address
            $table->string('password'); // Encrypted password (Laravel will handle this)
            $table->bigInteger('Grupy_id')->unsigned()->nullable(); // Foreign key referencing Grupy table (nullable)
            $table->string('stanowisko');
            $table->boolean('konto_aktywne')->default(true); // Active account by default
            $table->integer('ilosc_dni_urlopu')->default(0); // Default number of vacation days
            $table->timestamps(false); // Exclude timestamps (matches your model definition)

            // Foreign key constraint referencing Grupy table (if it exists)
            $table->foreign('Grupy_id')->references('id')->on('Grupy')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Pracownicy');
    }
};
