<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StrefyDostepuController extends Controller
{
    public function index(Request $request)
    {
        $strefyDostepu = DB::select('SELECT s.*, b.* FROM strefy_dostepu s LEFT JOIN budynki b ON s.budynek_id = b.budynek_id');
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
            DB::insert('INSERT INTO budynki (nazwa_budynku) VALUES (?)', [$nowy_budynek]);
            $budynek_id = DB::getPdo()->lastInsertId();
        }

        DB::insert('INSERT INTO strefy_dostepu (nazwa_strefy, budynek_id) VALUES (?, ?)', [
            $request->input('nazwa_strefy'),
            $budynek_id
        ]);

        $id = DB::getPdo()->lastInsertId();
        $strefaDostepu = DB::select('SELECT * FROM strefy_dostepu WHERE strefy_dostepu_id = ?', [$id]);

        return response()->json($strefaDostepu[0], 201);
    }

    public function show($id)
    {
        $strefaDostepu = DB::select('SELECT s.*, b.* FROM strefy_dostepu s LEFT JOIN budynki b ON s.budynek_id = b.budynek_id WHERE s.strefy_dostepu_id = ?', [$id]);
        if (empty($strefaDostepu)) {
            return response()->json(['message' => 'Strefa dostępu nie znaleziona'], 404);
        }
        return response()->json($strefaDostepu[0]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nazwa_strefy' => 'required|string|max:45',
            'budynek_id' => 'nullable|integer',
            'nowy_budynek' => 'nullable|string|max:255',
        ]);

        $strefaDostepu = DB::select('SELECT * FROM strefy_dostepu WHERE strefy_dostepu_id = ?', [$id]);
        if (empty($strefaDostepu)) {
            return response()->json(['message' => 'Strefa dostępu nie znaleziona'], 404);
        }

        $budynek_id = $request->input('budynek_id');
        $nowy_budynek = $request->input('nowy_budynek');

        if ($nowy_budynek) {
            DB::insert('INSERT INTO budynki (nazwa_budynku) VALUES (?)', [$nowy_budynek]);
            $budynek_id = DB::getPdo()->lastInsertId();
        }

        DB::update('UPDATE strefy_dostepu SET nazwa_strefy = ?, budynek_id = ? WHERE strefy_dostepu_id = ?', [
            $request->input('nazwa_strefy'),
            $budynek_id,
            $id
        ]);

        $strefaDostepu = DB::select('SELECT * FROM strefy_dostepu WHERE strefy_dostepu_id = ?', [$id]);

        return response()->json($strefaDostepu[0], 200);
    }

    public function destroy($id)
    {
        $strefaDostepu = DB::select('SELECT * FROM strefy_dostepu WHERE strefy_dostepu_id = ?', [$id]);
        if (empty($strefaDostepu)) {
            return response()->json(['message' => 'Strefa dostępu nie znaleziona'], 404);
        }

        DB::delete('DELETE FROM strefy_dostepu WHERE strefy_dostepu_id = ?', [$id]);

        return response()->json(null, 204);
    }
}
