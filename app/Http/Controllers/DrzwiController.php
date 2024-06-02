<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DrzwiController extends Controller
{
    public function index()
    {
        $drzwis = DB::select('SELECT d.*, s.* FROM drzwi d LEFT JOIN strefy_dostepu s ON d.Strefy_Dostepu_id = s.Strefy_Dostepu_id');
        return response()->json($drzwis);
    }

    public function show($id)
    {
        $drzwi = DB::select('SELECT d.*, s.* FROM drzwi d LEFT JOIN strefy_dostepu s ON d.Strefy_Dostepu_id = s.Strefy_Dostepu_id WHERE d.drzwi_id = ?', [$id]);
        if (empty($drzwi)) {
            return response()->json(['message' => 'Drzwi nie znalezione'], 404);
        }
        return response()->json($drzwi[0]);
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

        DB::insert('INSERT INTO drzwi (nr_drzwi, nazwa, WeWy, Strefy_Dostepu_id, drzwi_aktywne) VALUES (?, ?, ?, ?, ?)', [
            $request->input('nr_drzwi'),
            $request->input('nazwa'),
            $request->input('WeWy'),
            $request->input('Strefy_Dostepu_id'),
            $request->input('drzwi_aktywne')
        ]);

        $id = DB::getPdo()->lastInsertId();
        $drzwi = DB::select('SELECT * FROM drzwi WHERE drzwi_id = ?', [$id]);

        return response()->json($drzwi[0], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nr_drzwi' => 'required',
            'nazwa' => 'required',
            'WeWy' => 'required',
            'Strefy_Dostepu_id' => 'required',
            'drzwi_aktywne' => 'required',
        ]);

        DB::update('UPDATE drzwi SET nr_drzwi = ?, nazwa = ?, WeWy = ?, Strefy_Dostepu_id = ?, drzwi_aktywne = ? WHERE drzwi_id = ?', [
            $request->input('nr_drzwi'),
            $request->input('nazwa'),
            $request->input('WeWy'),
            $request->input('Strefy_Dostepu_id'),
            $request->input('drzwi_aktywne'),
            $id
        ]);

        $drzwi = DB::select('SELECT * FROM drzwi WHERE drzwi_id = ?', [$id]);

        return response()->json($drzwi[0], 200);
    }

    public function destroy($id)
    {
        $drzwi = DB::select('SELECT * FROM drzwi WHERE drzwi_id = ?', [$id]);
        if (empty($drzwi)) {
            return response()->json(['message' => 'Drzwi nie znalezione'], 404);
        }

        DB::delete('DELETE FROM drzwi WHERE drzwi_id = ?', [$id]);

        return response()->json(null, 204);
    }
}
