<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OgloszeniaHasStanowisko extends Model
{
    protected $table = 'Ogłoszenia_has_Stanowisko';
    public $timestamps = false;

    protected $fillable = [
        'Ogłoszenia_id',
        'Stanowisko_id',
    ];

    public function ogloszenie()
    {
        return $this->belongsTo(Ogloszenia::class, 'Ogłoszenia_id', 'Ogłoszenia_id');
    }

    public function stanowisko()
    {
        return $this->belongsTo(Stanowisko::class, 'Stanowisko_id', 'Stanowisko_id');
    }
}