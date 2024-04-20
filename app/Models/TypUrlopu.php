<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypUrlopu extends Model
{
    protected $table = 'Typ_urlopu';
    public $timestamps = false;

    protected $primaryKey = 'Typ_urlopu_id';

    protected $fillable = [
        'Nazwa',
        'czesc_wyplaty',
        'Typ_urlopucol',
    ];
}
