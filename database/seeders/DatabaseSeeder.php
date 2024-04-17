<?php

namespace Database\Seeders;

use App\Models\Pracownicy;
use App\Models\Grupy;
use App\Models\Stanowisko;


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        \App\Models\Stanowisko::factory(5)->create();
        \App\Models\Grupy::factory(3)->create();
        \App\Models\Pracownicy::factory(10)->create();

    }

}
