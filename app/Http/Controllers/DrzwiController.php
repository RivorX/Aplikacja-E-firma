<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Drzwi;

class DrzwiController extends Controller
{
    public function index()
    {
        $drzwis = Drzwi::with('strefyDostepu')->get();
        return response()->json($drzwis);
    }
    public function store(Request $request)
    {
        $request->validate([
            'nr_drzwi' => 'required',
            'nazwa' => 'required',
            'WeWy' => 'required',
            'Strefy_Dostepu_id' => 'required',
            'drzwi_aktywne' => 'required',
        ]);

        $drzwi = Drzwi::create($request->all());
        
        return response()->json($drzwi, 201);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'Drzwi_id' => 'required',
            'nr_drzwi' => 'required',
            'nazwa' => 'required',
            'WeWy' => 'required',
            'Strefy_Dostepu_id' => 'required',
            'drzwi_aktywne' => 'required',
        ]);

        $drzwi = Drzwi::findOrFail($id);
        $drzwi->update($request->all());

        return response()->json($drzwi, 200);
    }

    public function destroy($id)
    {
        $drzwi = Drzwi::findOrFail($id);
        $drzwi->delete();

        return response()->json(null, 204);
    }
}
