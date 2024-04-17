<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ogloszenia extends Model
{
    protected $table = 'Ogłoszenia';
    public $timestamps = false;

    protected $primaryKey = 'Ogłoszenia_id';

    protected $fillable = [
        'Pracownicy_id',
        'nazwa_ogloszenia',
        'opis_ogloszenia',
        'data_nadania',
    ];

    public function pracownik()
    {
        return $this->belongsTo(Pracownicy::class, 'Pracownicy_id', 'Pracownicy_id');
    }

    public function stanowiska()
    {
        return $this->belongsToMany(Stanowisko::class, 'Ogłoszenia_has_Stanowisko', 'Ogłoszenia_id', 'Stanowisko_id');
    }
}
