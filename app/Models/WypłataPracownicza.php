<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WypłataPracownicza extends Model
{
    protected $table = 'Wypłata_Pracownicza';
    public $timestamps = false;

    protected $primaryKey = 'Wypłata_Pracownicza_id';

    protected $fillable = [
        'Pracownicy_id',
        'Stanowisko_id',
        'mies_rok',
        'ilosc_h',
        'ilosc_nadgodzin',
        'premia',
        'wysłana_wypłata',
        'Nadgodziny_id',
        'Rodzaj_etatu_id',
    ];

    public function pracownik()
    {
        return $this->belongsTo(Pracownicy::class, 'Pracownicy_id', 'Pracownicy_id');
    }

    public function stanowisko()
    {
        return $this->belongsTo(Stanowisko::class, 'Stanowisko_id', 'Stanowisko_id');
    }

    public function nadgodziny()
    {
        return $this->belongsTo(Nadgodziny::class, 'Nadgodziny_id', 'Nadgodziny_id');
    }

    public function rodzajEtatu()
    {
        return $this->belongsTo(RodzajEtatu::class, 'Rodzaj_etatu_id', 'Rodzaj_etatu_id');
    }

    public function urlopy()
    {
        return $this->belongsToMany(Urlopy::class, 'Wypłata_Pracownicza_has_Urlopy', 'Wypłata_Pracownicza_id', 'Urlopy_id');
    }
}
