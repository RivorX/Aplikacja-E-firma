<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use SimpleSoftwareIO\QrCode\Facades\QrCode;
use PDF;




class QrCodeController extends Controller
{
    public function generateQRCode(Request $request) // TODO Temporary, remove later
    {
        $validator = Validator::make($request->all(), [
            'door_id' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $door_id = $request->door_id;

        // Generuj kod QR na podstawie przekazanego door_id
        $qrCode = QrCode::size(200)
            ->generate($door_id);
        
        return $qrCode;
    }
    public function download(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'door_id' => 'required|string',
            'door_name' => 'required|string',
            'required_zone' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $door_id = bcrypt($request->door_id);
        $doorName = $request->door_name;
        $requiredZone = $request->required_zone;

        // Generuj kod QR
        $qrCode = QrCode::size(200)
                    ->generate($door_id);

        // Zapisz wygenerowany kod QR na serwerze (opcjonalnie)
        // Możesz również zapisać go na serwerze, jeśli potrzebujesz go do późniejszego wykorzystania

        $data = [
            'door_name' => $doorName,
            'required_zone' => $requiredZone,
            'qrcode' => $qrCode // Przekazanie samego wygenerowanego kodu QR
        ];

        $html = '<h1>Nazwa drzwi: ' . $doorName . '</h1>';
        $html .= '<p>Strefa wymagana: ' . $requiredZone . '</p>';
        $html .= '<img src="data:image/png;base64,' . base64_encode($qrCode) . '" alt="QR Code">';
        $pdf = PDF::loadHTML($html);


        $nazwa_pliku = 'qrcode_' . $doorName . '.pdf'; 

        return $pdf->download($nazwa_pliku);
    }



}
