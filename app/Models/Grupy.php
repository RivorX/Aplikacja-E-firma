<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grupy extends Model
{
    protected $table = 'Grupy';
    protected $primaryKey = 'Grupy_id';
    public $timestamps = false;

    protected $fillable = [
        'nazwa_grupy',
    ];

    public function pracownicy()
    {
        return $this->hasMany(Pracownicy::class, 'Grupy_id', 'Grupy_id');
    }
}