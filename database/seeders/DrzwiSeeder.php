<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Drzwi;

class DrzwiSeeder extends Seeder
{
    public function run()
    {
        // Dodawanie przykładowych rekordów dla tabeli drzwi
        Drzwi::create([
            'nr_drzwi' => '1a',
            'nazwa' => 'Wejście do kuchni. Wyjście z strefa A',
            'WeWy' => 'We/Wy',
            'Strefy_Dostepu_id' => 2,
            'drzwi_aktywne' => 1,
        ]);

        Drzwi::create([
            'nr_drzwi' => '1b',
            'nazwa' => 'Wyjście z kuchni. Wejście do strefy A',
            'WeWy' => 'We/Wy',
            'Strefy_Dostepu_id' => 1,
            'drzwi_aktywne' => 1,
        ]);

        Drzwi::create([
            'nr_drzwi' => '2a',
            'nazwa' => 'Wejście do strefy C. Wyjście z strefy B',
            'WeWy' => 'We/Wy',
            'Strefy_Dostepu_id' => 4,
            'drzwi_aktywne' => 1,
        ]);

        Drzwi::create([
            'nr_drzwi' => '2b',
            'nazwa' => 'Wyjście z strefy C. Wejście do strefy B',
            'WeWy' => 'We/Wy',
            'Strefy_Dostepu_id' => 3,
            'drzwi_aktywne' => 1,
        ]);

        Drzwi::create([
            'nr_drzwi' => '3a',
            'nazwa' => 'Wejście do kuchni. Wyjście z strefy B',
            'WeWy' => 'We/Wy',
            'Strefy_Dostepu_id' => 2,
            'drzwi_aktywne' => 1,
        ]);

        Drzwi::create([
            'nr_drzwi' => '3b',
            'nazwa' => 'Wyjście z kuchni. Wejście do strefy B',
            'WeWy' => 'We/Wy',
            'Strefy_Dostepu_id' => 3,
            'drzwi_aktywne' => 1,
        ]);

        // Możesz dodać więcej rekordów w podobny sposób
    }
}
