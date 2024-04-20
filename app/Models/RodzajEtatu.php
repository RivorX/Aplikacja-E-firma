<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RodzajEtatu extends Model
{
    protected $table = 'Rodzaj_etatu';
    public $timestamps = false;

    protected $primaryKey = 'Rodzaj_etatu_id';

    protected $fillable = [
        'Nazwa',
        'Ilosc_h',
    ];
}