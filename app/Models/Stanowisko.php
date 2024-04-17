<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stanowisko extends Model
{
    protected $table = 'Stanowisko';
    protected $primaryKey = 'Stanowisko_id';
    public $timestamps = false;

    protected $fillable = [
        'nazwa_stanowiska',
        'opis',
        'stawka_h',
    ];

    public function pracownicy()
    {
        return $this->hasMany(Pracownicy::class, 'Stanowisko_id', 'Stanowisko_id');
    }
}