<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StrefyDostepu;

class StrefyDostepuController extends Controller
{
    public function index()
    {
        $strefyDostepu = StrefyDostepu::all();
        return response()->json($strefyDostepu);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nazwa_strefy' => 'required|string|max:45',
        ]);

        $strefaDostepu = StrefyDostepu::create($request->all());

        return response()->json($strefaDostepu, 201);
    }

    public function show($id)
    {
        $strefaDostepu = StrefyDostepu::findOrFail($id);
        return response()->json($strefaDostepu);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nazwa_strefy' => 'required|string|max:45',
        ]);

        $strefaDostepu = StrefyDostepu::findOrFail($id);
        $strefaDostepu->update($request->all());

        return response()->json($strefaDostepu, 200);
    }

    public function destroy($id)
    {
        $strefaDostepu = StrefyDostepu::findOrFail($id);
        $strefaDostepu->delete();

        return response()->json(null, 204);
    }
}
