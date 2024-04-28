<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ogloszenia extends Model
{
    protected $table = 'Ogloszenia';
    public $timestamps = false;
    protected $primaryKey = 'Ogloszenia_id';

    protected $fillable = [
        'Pracownicy_id',
        'tytul',
        'opis',
        'data_nadania',
    ];

    public function pracownik()
    {
        return $this->belongsTo(Pracownicy::class, 'Pracownicy_id', 'Pracownicy_id');
    }

    public function stanowiska()
    {
        return $this->belongsToMany(Stanowisko::class, 'Ogloszenia_has_Stanowisko', 'Ogloszenia_id', 'Stanowisko_id');
    }
}
