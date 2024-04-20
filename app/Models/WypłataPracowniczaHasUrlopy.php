<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WypłataPracowniczaHasUrlopy extends Model
{
    protected $table = 'Wypłata_Pracownicza_has_Urlopy';
    public $timestamps = false;

    protected $fillable = [
        'Wypłata_Pracownicza_id',
        'Urlopy_id',
    ];
}