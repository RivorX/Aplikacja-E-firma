<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ObecnoscPracownikow extends Model
{
    use HasFactory;

    protected $table = 'obecność_pracowników';

    protected $primaryKey = 'Obecność_pracowników_id';
    public $timestamps = false; 
    protected $fillable = [
        'Pracownicy_id',
        'Data',
        'Wejście',
        'Wyjście',
        'Ostrzeżenie',
    ];
}
