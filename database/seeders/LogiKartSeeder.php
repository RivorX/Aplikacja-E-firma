<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LogiKart;
use Carbon\Carbon; 

class LogiKartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Generowanie losowych logów kart
        for ($i = 0; $i < 50; $i++) {
            $kartaDostepuId = 1; 
            $strefyDostepuId = rand(1, 4); // Załóżmy, że istnieje 5 różnych stref dostępu
            $drzwiId = rand(1, 1) == 1 ? 1 : rand(4, 8); // Losowy identyfikator drzwi
            $dataProby = Carbon::now()->subHours(rand(1, 24)); // Losowa data z ostatnich 24 godzin
            $dostepPrzyznany = rand(0, 1); // Losowy dostęp przyznany (0 lub 1)

            // Tworzenie logu karty
            LogiKart::create([
                'Karta_Dostepu_id' => $kartaDostepuId,
                'Strefy_Dostepu_id' => $strefyDostepuId,
                'Drzwi_id' => $drzwiId,
                'data_proby' => $dataProby,
                'dostęp_przyznany' => $dostepPrzyznany,
            ]);
        }
    }
}
