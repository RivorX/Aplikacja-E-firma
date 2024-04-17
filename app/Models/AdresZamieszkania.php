<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdresZamieszkania extends Model
{
    protected $table = 'Adres_Zamieszkania';
    protected $primaryKey = 'Adres_Zamieszkania_id';
    public $timestamps = false;

    protected $fillable = [
        'data_dodania',
        'miasto',
        'ulica',
        'nr_domu',
        'kod_pocztowy',
    ];

    public function pracownicy()
    {
        return $this->belongsToMany(Pracownicy::class, 'Pracownicy_has_Adres_Zamieszkania', 'Adres_Zamieszkania_id', 'Pracownicy_id');
    }
}
