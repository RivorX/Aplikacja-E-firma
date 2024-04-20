<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nadgodziny extends Model
{
    protected $table = 'Nadgodziny';
    public $timestamps = false;

    protected $primaryKey = 'Nadgodziny_id';

    protected $fillable = [
        'Sposob_wykorzystania_urlopu_id',
        'Nadgodzinycol',
    ];

    public function sposobWykorzystaniaUrlopu()
    {
        return $this->belongsTo(SposobWykorzystaniaUrlopu::class, 'Sposob_wykorzystania_urlopu_id', 'Sposob_wykorzystania_urlopu_id');
    }
}