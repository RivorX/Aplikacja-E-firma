<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Budynki;

class BudynkiController extends Controller
{
    public function index()
    {
        $budynki = Budynki::all();
        return response()->json($budynki);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nazwa_budynku' => 'required|string|max:45',
            'opis_budynku' => 'nullable|string|max:255',
        ]);

        $budynki = Budynki::create($request->all());

        return response()->json($budynki, 201);
    }

    public function show($id)
    {
        $budynki = Budynki::findOrFail($id);
        return response()->json($budynki);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nazwa_budynku' => 'required|string|max:45',
            'opis_budynku' => 'nullable|string|max:255',
        ]);

        $budynki = Budynki::findOrFail($id);
        $budynki->update($request->all());

        return response()->json($budynki, 200);
    }

    public function destroy($id)
    {
        $budynki = Budynki::findOrFail($id);
        $budynki->delete();

        return response()->json(null, 204);
    }
}
