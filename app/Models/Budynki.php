<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Budynki extends Model
{
    protected $table = 'Budynki';
    protected $primaryKey = 'budynek_id';
    public $timestamps = false;

    protected $fillable = [
        'nazwa_budynku',
        'opis_budynku',
    ];
}
