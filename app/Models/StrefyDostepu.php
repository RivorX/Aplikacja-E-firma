<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StrefyDostepu extends Model
{
    protected $table = 'Strefy_Dostepu';
    protected $primaryKey = 'Strefy_Dostepu_id';
    public $timestamps = false;

    protected $fillable = [
        'nazwa_strefy'
    ];

    public function drzwi()
    {
        return $this->belongsToMany(Drzwi::class, 'rodzaj_drzwi_has_logi_kart', 'Strefy_Dostepu_id', 'Drzwi_id');
    }

    public function kartyDostepu()
    {
        return $this->belongsToMany(KartaDostepu::class, 'Karta_Dostepu_has_Strefy_Dostepu', 'Strefy_Dostepu_id', 'Karta_Dostepu_id');
    }
}