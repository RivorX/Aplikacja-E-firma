<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aktualnosci extends Model
{
    protected $table = 'Aktualnosci';
    public $timestamps = false;

    protected $primaryKey = 'Aktualnosci_id';

    protected $fillable = [
        'tytul',
        'opis',
        'data_nadania',
    ];
}

