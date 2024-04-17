<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pracownicy;
use Illuminate\Support\Facades\Hash;

class PracownicySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Dodaj przykładowych pracowników
        Pracownicy::create([
            'Stanowisko_id' => 1,
            'Grupy_id' => 1,
            'email' => 'jan@example.com',
            'password' => Hash::make('password'),
            'imie' => 'Jan',
            'nazwisko' => 'Kowalski',
            'konto_aktywne' => true,
            'ilosc_dni_urlopu' => 20,
            'Data_edycji' => now(),
        ]);

        // Pracownicy::create([
        //     'Stanowisko_id' => 1,
        //     'Grupy_id' => 2,
        //     'email' => 'anna@example.com',
        //     'haslo' => bcrypt('password'),
        //     'imie' => 'Anna',
        //     'nazwisko' => 'Nowak',
        //     'konto_aktywne' => true,
        //     'ilosc_dni_urlopu' => 20,
        //     'Data_edycji' => now(),
        // ]);

        // Dodaj więcej pracowników według potrzeb
    }
}
