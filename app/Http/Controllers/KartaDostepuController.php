<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KartaDostepu;
use App\Models\Pracownicy;
use App\Models\StrefyDostepu;
use App\Models\KartaDostepuHasStrefaDostepu;
use Illuminate\Support\Facades\DB;

class KartaDostepuController extends Controller
{

  
    // Pobranie wszystkich kart dostępu
    public function getAll()
    {
        $kartyDostepu = KartaDostepu::with('pracownik', 'strefyDostepu')->get();

        if ($kartyDostepu->isEmpty()) {
            return response()->json(['message' => 'Nie znaleziono kart dostępu'], 404);
        }

        return response()->json(['kartyDostepu' => $kartyDostepu]);
    }

    // Pobranie karty dostępu o podanym ID
    public function getById($id)
    {
        $kartaDostepu = KartaDostepu::with('pracownik', 'strefyDostepu')->find($id);

        if (!$kartaDostepu) {
            return response()->json(['message' => 'Karta dostępu o podanym ID nie istnieje'], 404);
        }

        return response()->json(['kartaDostepu' => $kartaDostepu]);
    }
    // Generowanie unikalnego numeru seryjnego
    private function generateUniqueSerialNumber() {
        $serialNumber = null;
        do {
            // Generowanie 11-znakowego numeru seryjnego
            $serialNumber = strtoupper(bin2hex(random_bytes(5))); // 10 znaków hexadecymalnych
        } while (KartaDostepu::where('numer_seryjny', $serialNumber)->exists()); // Sprawdzenie czy numer seryjny już istnieje
        return $serialNumber;
    }
    
    // Utworzenie nowej karty dostępu
    public function store(Request $request)
    {
        // Wrap logic in a database transaction
        DB::beginTransaction();

        try {
            // Validation remains the same except for numer_seryjny
            $validatedData = $request->validate([
                'Pracownicy_id' => 'required|integer|exists:Pracownicy,Pracownicy_id',
                'data_wydania' => 'required|date',
                'data_waznosci' => 'required|date|after:data_wydania',
                'karta_aktywna' => 'required|boolean',
                'inne_dane' => 'nullable|string',
                'strefy_dostepu_id' => 'required|array|exists:Strefy_Dostepu,Strefy_Dostepu_id',
            ]);

            // Generate unique serial number
            $numerSeryjny = $this->generateUniqueSerialNumber();

            // Fetch employee and access zones
            $pracownik = Pracownicy::find($validatedData['Pracownicy_id']);
            $strefyDostepu = StrefyDostepu::findMany($validatedData['strefy_dostepu_id']);

            // Create new access card
            $kartaDostepu = KartaDostepu::create([
                'Pracownicy_id' => $validatedData['Pracownicy_id'],
                'numer_seryjny' => $numerSeryjny, // Assign generated serial number
                'data_wydania' => $validatedData['data_wydania'],
                'data_waznosci' => $validatedData['data_waznosci'],
                'karta_aktywna' => $validatedData['karta_aktywna'],
                'inne_dane' => $validatedData['inne_dane'],
            ]);

            // Attach access zones to the card
            $kartaDostepu->strefyDostepu()->attach($strefyDostepu);

            // Commit the transaction if successful
            DB::commit();

            // Return success response with newly created card and generated serial number
            return response()->json(['message' => 'Karta dostępu utworzona', 'kartaDostepu' => $kartaDostepu, 'numerSeryjny' => $numerSeryjny], 201);
        } catch (\Exception $e) {
            // Rollback the transaction on any error
            DB::rollBack();

            // Return error response
            return response()->json(['message' => 'Wystąpił błąd podczas tworzenia karty dostępu: ' . $e->getMessage()], 500);
        }
    }


    // Aktualizacja istniejącej karty dostępu
    public function update(Request $request, $id)
    {
        // Wrap logic in a database transaction
        DB::beginTransaction();

        try {
            // Fetch the access card to update
            $kartaDostepu = KartaDostepu::with('pracownik', 'strefyDostepu')->find($id);

            if (!$kartaDostepu) {
                return response()->json(['message' => 'Karta dostępu o podanym ID nie istnieje'], 404);
            }

            // Validation remains the same
            $validatedData = $request->validate([
                'numer_seryjny' => 'required|string|unique:Karta_Dostepu,numer_seryjny,' . $id,
                'data_wydania' => 'required|date',
                'data_waznosci' => 'required|date|after:data_wydania',
                'karta_aktywna' => 'required|boolean',
                'inne_dane' => 'nullable|string',
                'strefy_dostepu_id' => 'required|array|exists:Strefy_Dostepu,Strefy_Dostepu_id',
            ]);

            // Detach existing access zones
            $kartaDostepu->strefyDostepu()->detach();

            // Update card details
            $kartaDostepu->numer_seryjny = $validatedData['numer_seryjny'];
            $kartaDostepu->data_wydania = $validatedData['data_wydania'];
            $kartaDostepu->data_waznosci = $validatedData['data_waznosci'];
            $kartaDostepu->karta_aktywna = $validatedData['karta_aktywna'];
            $kartaDostepu->inne_dane = $validatedData['inne_dane'];
            $kartaDostepu->save();

            // Attach updated access zones
            $strefyDostepu = StrefyDostepu::findMany($validatedData['strefy_dostepu_id']);
            $kartaDostepu->strefyDostepu()->attach($strefyDostepu);

            // Commit the transaction if successful
            DB::commit();

            // Return success response with updated card
            return response()->json(['message' => 'Karta dostępu zaktualizowana', 'kartaDostepu' => $kartaDostepu]);
        } catch (\Exception $e) {
            // Rollback the transaction on any error
            DB::rollBack();

            // Return error response
            return response()->json(['message' => 'Wystąpił błąd podczas aktualizacji karty dostępu: ' . $e->getMessage()], 500);
        }
    }

    public function changeCardStatus($id)
    {
        // Wrap logic in a database transaction
        DB::beginTransaction();

        try {
            // Fetch the access card to update
            $kartaDostepu = KartaDostepu::find($id);

            if (!$kartaDostepu) {
                return response()->json(['message' => 'Karta dostępu o podanym ID nie istnieje'], 404);
            }

            // Toggle card status
            $kartaDostepu->karta_aktywna = !$kartaDostepu->karta_aktywna;
            $kartaDostepu->save();

            // Commit the transaction if successful
            DB::commit();

            // Return success response with updated card
            $status = $kartaDostepu->karta_aktywna ? 'aktywowana' : 'dezaktywowana';
            return response()->json(['message' => "Karta dostępu $status"]);
        } catch (\Exception $e) {
            // Rollback the transaction on any error
            DB::rollBack();

            // Return error response
            return response()->json(['message' => 'Wystąpił błąd podczas zmiany statusu karty dostępu: ' . $e->getMessage()], 500);
        }
    }

    

    public function destroy($id)
{
    // Wrap logic in a database transaction
    DB::beginTransaction();

    try {
        // Fetch the access card to delete
        $kartaDostepu = KartaDostepu::find($id);

        if (!$kartaDostepu) {
            return response()->json(['message' => 'Karta dostępu o podanym ID nie istnieje'], 404);
        }

        // Delete related records from the pivot table
        $kartaDostepu->strefyDostepu()->detach();

        // Delete the access card
        $kartaDostepu->delete();

        // Commit the transaction if successful
        DB::commit();

        // Return success response
        return response()->json(['message' => 'Karta dostępu usunięta']);
    } catch (\Exception $e) {
        // Rollback the transaction on any error
        DB::rollBack();

        // Return error response
        return response()->json(['message' => 'Wystąpił błąd podczas usuwania karty dostępu: ' . $e->getMessage()], 500);
    }
}


}

