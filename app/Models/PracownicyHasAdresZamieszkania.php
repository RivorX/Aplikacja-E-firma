<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PracownicyHasAdresZamieszkania extends Model
{
    protected $table = 'Pracownicy_has_Adres_Zamieszkania';
    public $timestamps = false;

    protected $fillable = [
        'Pracownicy_id',
        'Adres_Zamieszkania_id',
    ];

    public function pracownik()
    {
        return $this->belongsTo(Pracownicy::class, 'Pracownicy_id', 'Pracownicy_id');
    }

    public function adresZamieszkania()
    {
        return $this->belongsTo(AdresZamieszkania::class, 'Adres_Zamieszkania_id', 'Adres_Zamieszkania_id');
    }
}
