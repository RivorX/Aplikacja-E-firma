<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StrefyDostepu extends Model
{
    protected $table = 'Strefy_Dostepu';
    protected $primaryKey = 'Strefy_Dostepu_id';
    public $timestamps = false;

    protected $fillable = [
        'nazwa_strefy',
        'budynek_id'
    ];

    public function drzwi()
    {
        return $this->belongsToMany(Drzwi::class, 'rodzaj_drzwi_has_logi_kart', 'Strefy_Dostepu_id', 'Drzwi_id');
    }

    public function kartyDostepu()
    {
        return $this->belongsToMany(KartaDostepu::class, 'Karta_Dostepu_has_Strefy_Dostepu', 'Strefy_Dostepu_id', 'Karta_Dostepu_id');
    }

    public function budynek()
    {
        return $this->belongsTo(Budynki::class, 'budynek_id', 'budynek_id');
    }

    // Relacja z logami kart
    public function logiKart()
    {
        return $this->hasMany(LogiKart::class, 'Strefy_Dostepu_id', 'Strefy_Dostepu_id');
    }
}
