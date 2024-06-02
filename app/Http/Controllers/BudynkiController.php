<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BudynkiController extends Controller
{
    public function index()
    {
        $budynki = DB::select('SELECT * FROM budynki');
        return response()->json($budynki);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nazwa_budynku' => 'required|string|max:45',
            'opis_budynku' => 'nullable|string|max:255',
        ]);

        DB::insert('INSERT INTO budynki (nazwa_budynku, opis_budynku) VALUES (?, ?)', [
            $request->input('nazwa_budynku'),
            $request->input('opis_budynku')
        ]);

        $id = DB::getPdo()->lastInsertId();
        $budynki = DB::select('SELECT * FROM budynki WHERE budynek_id= ?', [$id]);

        return response()->json($budynki[0], 201);
    }

    public function show($id)
    {
        $budynki = DB::select('SELECT * FROM budynki WHERE budynek_id = ?', [$id]);
        if (empty($budynki)) {
            return response()->json(['message' => 'Budynek nie znaleziony'], 404);
        }
        return response()->json($budynki[0]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nazwa_budynku' => 'required|string|max:45',
            'opis_budynku' => 'nullable|string|max:255',
        ]);

        DB::update('UPDATE budynki SET nazwa_budynku = ?, opis_budynku = ? WHERE budynek_id = ?', [
            $request->input('nazwa_budynku'),
            $request->input('opis_budynku'),
            $id
        ]);

        $budynki = DB::select('SELECT * FROM budynki WHERE budynek_id = ?', [$id]);

        return response()->json($budynki[0], 200);
    }

    public function destroy($id)
    {
        $budynki = DB::select('SELECT * FROM budynki WHERE budynek_id = ?', [$id]);
        if (empty($budynki)) {
            return response()->json(['message' => 'Budynek nie znaleziony'], 404);
        }

        DB::delete('DELETE FROM budynki WHERE budynek_id = ?', [$id]);

        return response()->json(null, 204);
    }
}
