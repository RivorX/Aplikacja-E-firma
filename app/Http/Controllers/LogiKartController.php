<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Barryvdh\DomPDF\Facade\Pdf;

class LogiKartController extends Controller
{
    public function cardLogsReport(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'startDate' => 'required|date',
            'endDate' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $startDate = $request->startDate;
        $endDate = $request->endDate;

        // Raw SQL query
        $logs = DB::select("
            SELECT 
                logi_kart.Karta_Dostepu_id,
                karta_dostepu.numer_seryjny,
                Pracownicy.imie,
                Pracownicy.nazwisko,
                SUM(CASE WHEN logi_kart.dostęp_przyznany = 1 THEN 1 ELSE 0 END) as pozytywne_proby,
                SUM(CASE WHEN logi_kart.dostęp_przyznany = 0 THEN 1 ELSE 0 END) as negatywne_proby,
                COUNT(*) as total_proby
            FROM logi_kart
            INNER JOIN karta_dostepu ON logi_kart.Karta_Dostepu_id = karta_dostepu.Karta_Dostepu_id
            INNER JOIN Pracownicy ON karta_dostepu.Pracownicy_id = Pracownicy.Pracownicy_id
            WHERE logi_kart.data_proby BETWEEN ? AND ?
            GROUP BY logi_kart.Karta_Dostepu_id, karta_dostepu.numer_seryjny, Pracownicy.imie, Pracownicy.nazwisko
        ", [$startDate, $endDate]);

        // Generowanie HTML dla PDF
        $html = '<h1>Raport z logów kart</h1>';
        $html .= '<table border="1" cellspacing="0" cellpadding="5">';
        $html .= '<thead><tr>';
        $html .= '<th>Karta ID</th>';
        $html .= '<th>Numer Karty</th>';
        $html .= '<th>Imię</th>';
        $html .= '<th>Nazwisko</th>';
        $html .= '<th>Pozytywne Próby</th>';
        $html .= '<th>Negatywne Próby</th>';
        $html .= '<th>Łączne Próby</th>';
        $html .= '</tr></thead>';
        $html .= '<tbody>';

        foreach ($logs as $log) {
            $html .= '<tr>';
            $html .= '<td>' . $log->Karta_Dostepu_id . '</td>';
            $html .= '<td>' . $log->numer_seryjny . '</td>';
            $html .= '<td>' . $log->imie . '</td>';
            $html .= '<td>' . $log->nazwisko . '</td>';
            $html .= '<td>' . $log->pozytywne_proby . '</td>';
            $html .= '<td>' . $log->negatywne_proby . '</td>';
            $html .= '<td>' . $log->total_proby . '</td>';
            $html .= '</tr>';
        }

        $html .= '</tbody></table>';

        // Generowanie PDF
        $pdf = Pdf::loadHTML($html);
        return $pdf->download('report.pdf');
    }
}
