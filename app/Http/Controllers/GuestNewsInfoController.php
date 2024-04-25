<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Aktualnosci;

class GuestNewsInfoController extends Controller
{
    public function GuestNewsInfo()
    {
        $NewsInfo = Aktualnosci::limit(6)->get();

        if ($NewsInfo->isEmpty()) {
            return response()->json(['message' => 'Brak aktualności'], 404);
        }

        return response()->json(['NewsInfo' => $NewsInfo]);
    }
}
