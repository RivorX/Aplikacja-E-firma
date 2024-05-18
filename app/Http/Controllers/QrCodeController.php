<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Crypt;
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
            'door_id' => 'required|int',
            'door_name' => 'required|string',
            'required_zone' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $qrsalt = env('QRSALT');
        $door_id_qrsalt = $request->door_id.$qrsalt;
        $door_id = Crypt::encryptString($door_id_qrsalt);
        $doorName = $request->door_name;
        $requiredZone = $request->required_zone;

        // Generuj kod QR
        $qrCode = QrCode::size(200)
                    ->generate($door_id);


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


    public function qrcodeCheckAccess(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'scannedText' => 'required|string',
            'userId' => 'required|int',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
    
        $qrsalt = env('QRSALT');
        $Pracownicy_id = $request->userId;
        $scannedText = $request->scannedText;
    
        // Pobierz najnowszą kartę dostępu pracownika
        $latestCard = DB::table('karta_dostepu')
            ->where('Pracownicy_id', $Pracownicy_id)
            ->orderBy('data_wydania', 'desc')
            ->first();
    
        // Sprawdź, czy pracownik ma kartę dostępu
        if (!$latestCard) {
            return response()->json(['message' => 'Brak karty dostępu dla pracownika.'], 403);
        }
    
        // Sprawdź, czy karta jest ważna
        if (strtotime($latestCard->data_waznosci) < strtotime('today')) {
            return response()->json(['message' => 'Karta dostępu pracownika wygasła.'], 403);
        }
    
        // Sprawdź, czy karta jest aktywna
        if ($latestCard->karta_aktywna == 0) {
            return response()->json(['message' => 'Karta dostępu pracownika jest nieaktywna.'], 403);
        }
    
        $decryptedText = Crypt::decryptString($scannedText);
        $decryptedDoorId = str_replace($qrsalt, '', $decryptedText);
    
        // Sprawdź, czy przekazane door_id jest zgodne z bazą danych drzwi
        $door = DB::table('drzwi')->where('drzwi_id', $decryptedDoorId)->first();
    
        if (!$door) {
            return response()->json(['message' => 'Drzwi z kodu QR nie istnieją.'], 403);
        }
    
        // Sprawdź, czy pracownik ma dostęp do strefy dostępu
        $access = DB::table('karta_dostepu_has_strefy_dostepu')
            ->where('Karta_Dostepu_id', $latestCard->Karta_Dostepu_id)
            ->where('Strefy_Dostepu_id', $door->Strefy_Dostepu_id)
            ->exists();
    
        if (!$access) {
            return response()->json(['message' => 'Pracownik nie ma dostępu do tej strefy.'], 403);
        }
    
        return response()->json(['message' => 'Pracownik ma dostęp do tej strefy.'], 200);
    }
    




}
