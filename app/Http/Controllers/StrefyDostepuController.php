<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StrefyDostepu;
use App\Models\Budynki;

class StrefyDostepuController extends Controller
{
    public function index(Request $request)
    {
        $strefyDostepu = StrefyDostepu::with('budynek')->get();

        return response()->json(['strefyDostepu' => $strefyDostepu]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nazwa_strefy' => 'required|string|max:45',
            'budynek_id' => 'nullable|integer',
            'nowy_budynek' => 'nullable|string|max:255',
        ]);

        $budynek_id = $request->input('budynek_id');
        $nowy_budynek = $request->input('nowy_budynek');

        if ($nowy_budynek) {
            $budynek = Budynki::create(['nazwa_budynku' => $nowy_budynek]);
            $budynek_id = $budynek->budynek_id;
        }

        $strefaDostepu = StrefyDostepu::create([
            'nazwa_strefy' => $request->input('nazwa_strefy'),
            'budynek_id' => $budynek_id,
        ]);

        return response()->json($strefaDostepu, 201);
    }

    public function show($id)
    {
        $strefaDostepu = StrefyDostepu::with('budynek')->findOrFail($id);
        return response()->json($strefaDostepu);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nazwa_strefy' => 'required|string|max:45',
            'budynek_id' => 'nullable|integer',
            'nowy_budynek' => 'nullable|string|max:255',
        ]);

        $strefaDostepu = StrefyDostepu::findOrFail($id);

        $budynek_id = $request->input('budynek_id');
        $nowy_budynek = $request->input('nowy_budynek');

        if ($nowy_budynek) {
            $budynek = Budynki::create(['nazwa_budynku' => $nowy_budynek]);
            $budynek_id = $budynek->id;
        }

        $strefaDostepu->update([
            'nazwa_strefy' => $request->input('nazwa_strefy'),
            'budynek_id' => $budynek_id,
        ]);

        return response()->json($strefaDostepu, 200);
    }

    public function destroy($id)
    {
        $strefaDostepu = StrefyDostepu::findOrFail($id);
        $strefaDostepu->delete();

        return response()->json(null, 204);
    }
}
