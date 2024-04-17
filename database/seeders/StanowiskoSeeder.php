<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Stanowisko;

class StanowiskoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Dodaj przykładowe stanowiska
        Stanowisko::create([
            'nazwa_stanowiska' => 'Manager',
            'stawka_h' => 25.00,
        ]);

        Stanowisko::create([
            'nazwa_stanowiska' => 'Specjalista ds. marketingu',
            'stawka_h' => 20.00,
        ]);

        // Dodaj więcej stanowisk według potrzeb

        // Możesz także użyć fabryki Stanowisko::factory()->count(10)->create(); aby utworzyć wiele stanowisk za pomocą fabryki, jeśli masz zdefiniowaną fabrykę dla modelu Stanowisko.
    }
}
