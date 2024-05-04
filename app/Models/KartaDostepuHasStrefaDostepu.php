<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KartaDostepuHasStrefaDostepu extends Model
{
    protected $table = 'Karta_Dostepu_has_Strefy_Dostepu';
    public $timestamps = false;

    protected $fillable = [
        'Karta_Dostepu_id',
        'Strefy_Dostepu_id',
    ];

    public function kartaDostepu()
    {
        return $this->belongsTo(KartaDostepu::class, 'Karta_Dostepu_id', 'Karta_Dostepu_id');
    }

    public function strefaDostepu()
    {
        return $this->belongsTo(StrefyDostepu::class, 'Strefy_Dostepu_id', 'Strefy_Dostepu_id');
    }
}
