<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Aktualnosci;

class GuestNewsInfo extends Controller
{
    public function NewsInfo()
    {
        $NewsInfo = Aktualnosci::limit(5)->get();

        if ($NewsInfo->isEmpty()) {
            return response()->json(['message' => 'Brak aktualnosci'], 404);
        }

        return response()->json(['NewsInfo' => $NewsInfo]);
    }
}
