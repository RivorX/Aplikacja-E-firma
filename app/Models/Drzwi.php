<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Drzwi extends Model
{
    protected $table = 'drzwi'; // Zmodyfikuj nazwę tabeli
    protected $primaryKey = 'Drzwi_id'; // Klucz główny
    public $timestamps = false; // Nie używamy domyślnych kolumn created_at i updated_at

    protected $fillable = [
        'nr_drzwi',
        'nazwa',
        'WeWy',
        'Strefy_Dostepu_id',
        'drzwi_aktywne',
    ];

    public function strefyDostepu()
    {
        return $this->belongsTo(StrefyDostepu::class, 'Strefy_Dostepu_id', 'Strefy_Dostepu_id');
    }
}
