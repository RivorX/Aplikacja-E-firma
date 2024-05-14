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
        Schema::create('Stanowiska', function (Blueprint $table) {
            $table->increments('Stanowisko_id');
            $table->string('nazwa_stanowiska', 45);
            $table->string('opis', 45)->nullable();
            $table->decimal('stawka_h', 10, 0);
            $table->timestamps(); // Automatycznie dodane kolumny created_at i updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Stanowiska');
    }
};
