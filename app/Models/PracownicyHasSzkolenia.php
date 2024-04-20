<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PracownicyHasSzkolenia extends Model
{
    protected $table = 'Pracownicy_has_Szkolenia';
    public $timestamps = false;

    protected $fillable = [
        'Pracownicy_id',
        'Szkolenia_id',
    ];

    public function pracownik()
    {
        return $this->belongsTo(Pracownicy::class, 'Pracownicy_id', 'Pracownicy_id');
    }

    public function szkolenie()
    {
        return $this->belongsTo(Szkolenia::class, 'Szkolenia_id', 'Szkolenia_id');
    }
}