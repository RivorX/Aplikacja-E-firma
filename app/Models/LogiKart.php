<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LogiKart extends Model
{
    protected $table = 'Logi_kart';
    protected $primaryKey = 'Logi_kart_id';
    public $timestamps = false;

    protected $fillable = [
        'Karta_Dostepu_id',
        'Strefy_Dostepu_id',
        'data_proby',
        'dostęp_przyznany',
    ];

    public function kartaDostepu()
    {
        return $this->belongsTo(KartaDostepu::class, 'Karta_Dostepu_id', 'Karta_Dostepu_id');
    }

    public function strefyDostepu()
    {
        return $this->belongsTo(StrefyDostepu::class, 'Strefy_Dostepu_id', 'Strefy_Dostepu_id');
    }
}