<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Grupy;

class GrupySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Tworzenie grupy "admin", jeśli nie istnieje
        Grupy::firstOrCreate(['nazwa_grupy' => 'admin']);

        // Tworzenie grupy "pracownik", jeśli nie istnieje
        Grupy::firstOrCreate(['nazwa_grupy' => 'pracownik']);
    }
}
