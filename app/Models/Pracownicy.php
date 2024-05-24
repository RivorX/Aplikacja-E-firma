<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Pracownicy extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'Pracownicy';
    protected $primaryKey = 'Pracownicy_id';
    public $timestamps = false;

    protected $fillable = [
        'imie',
        'nazwisko',
        'email',
        'password',
        'Grupy_id',
        'Stanowisko_id',
        'konto_aktywne',
        'ilosc_dni_urlopu',
        'Data_edycji',
        'Data_utworzenia',
    ];

    protected $hidden = [
        'password',
    ];

    public function getAuthPassword()
    {
        return $this->password;
    }

    public function stanowisko()
    {
        return $this->belongsTo(Stanowisko::class, 'Stanowisko_id', 'Stanowisko_id');
    }

    public function grupa()
    {
        return $this->belongsTo(Grupy::class, 'Grupy_id', 'Grupy_id');
    }

    // Dodaj relację do kart dostępu
    public function kartyDostepu()
    {
        return $this->hasMany(KartaDostepu::class, 'Pracownicy_id', 'Pracownicy_id');
    }
}
