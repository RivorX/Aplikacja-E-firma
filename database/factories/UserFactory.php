<?php

namespace Database\Factories;

use App\Models\Pracownicy;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PracownicyFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Pracownicy::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'imie' => $this->faker->firstName,
            'nazwisko' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'haslo' => bcrypt('password'), // Domyślne hasło, możesz zmienić
            'Grupy_id' => 1, // Ustaw id grupy, może być losowe lub stałe
            'stanowisko_id' => 1, // Ustaw id stanowiska, może być losowe lub stałe
            'konto_aktywne' => 1,
            'ilosc_dni_urlopu' => 0,
            'Data_edycji' => now(),
        ];
    }
}
