<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KartaDostepu extends Model
{
    protected $table = 'Karta_Dostepu';
    protected $primaryKey = 'Karta_Dostepu_id';
    public $timestamps = false;

    protected $fillable = [
        'Pracownicy_id',
        'numer_seryjny',
        'data_wydania',
        'data_waznosci',
        'karta_aktywna',
        'inne_dane',
    ];

    public function pracownik()
    {
        return $this->belongsTo(Pracownicy::class, 'Pracownicy_id', 'Pracownicy_id');
    }

    public function strefyDostepu()
    {
        return $this->belongsToMany(StrefyDostepu::class, 'Karta_Dostepu_has_Strefy_Dostepu', 'Karta_Dostepu_id', 'Strefy_Dostepu_id');
    }

    public function logiKart()
    {
        return $this->hasMany(LogiKart::class, 'Karta_Dostepu_id', 'Karta_Dostepu_id');
    }
}
