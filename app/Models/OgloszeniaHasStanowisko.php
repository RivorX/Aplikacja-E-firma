<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OgloszeniaHasStanowisko extends Model
{
    protected $table = 'Ogloszenia_has_Stanowisko';
    public $timestamps = false;

    protected $fillable = [
        'Ogloszenia_id',
        'Stanowisko_id',
    ];

    public function ogloszenie()
    {
        return $this->belongsTo(Ogloszenia::class, 'Ogloszenia_id', 'Ogłoszenia_id');
    }

    public function stanowisko()
    {
        return $this->belongsTo(Stanowisko::class, 'Stanowisko_id', 'Stanowisko_id');
    }
}