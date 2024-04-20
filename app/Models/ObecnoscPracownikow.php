<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ObecnoscPracownikow extends Model
{
    protected $table = 'Obecność_pracowników';
    protected $primaryKey = 'Obecność_pracowników_id';
    public $timestamps = false;

    protected $fillable = [
        'Pracownicy_id',
        'Data',
        'Wejście',
        'Wyjście',
        'Ostrzeżenie',
    ];

    public function pracownik()
    {
        return $this->belongsTo(Pracownicy::class, 'Pracownicy_id', 'Pracownicy_id');
    }
}
