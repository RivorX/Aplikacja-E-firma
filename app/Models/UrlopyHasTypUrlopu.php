<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UrlopyHasTypUrlopu extends Model
{
    protected $table = 'Urlopy_has_Typ_urlopu';
    public $timestamps = false;

    protected $fillable = [
        'Urlopy_id',
        'Typ_urlopu_id',
    ];

    public function urlop()
    {
        return $this->belongsTo(Urlopy::class, 'Urlopy_id', 'Urlopy_id');
    }

    public function typUrlopu()
    {
        return $this->belongsTo(TypUrlopu::class, 'Typ_urlopu_id', 'Typ_urlopu_id');
    }
}