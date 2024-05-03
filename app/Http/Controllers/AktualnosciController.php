<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Aktualnosci;
 
/**
 * @OA\Info(
 *   title="Documentacja API: Aktualności",
 *   version="1.0.0",
 *   description="Dokumentacja API dla zarządzania aktualnościami",
 *   @OA\Contact(
 *       email="kontakt@przykladowyemail.com"
 *   ),
 *   @OA\License(
 *       name="MIT",
 *       url="https://opensource.org/licenses/MIT"
 *   )
 * )
 */
/**
 * @OA\Schema(
 *     schema="AktualnosciSchema",
 *     required={"Aktualnosci_id", "tytul", "opis", "data_nadania"},
 *     @OA\Property(property="Aktualnosci_id", type="integer", format="int64", example=1),
 *     @OA\Property(property="tytul", type="string", example="Tytuł aktualności"),
 *     @OA\Property(property="opis", type="string", example="Opis aktualności"),
 *     @OA\Property(property="data_nadania", type="string", format="date-time", example="2024-04-23 12:00:00"),
 * )
 */
class AktualnosciController extends Controller
{
    /**
     * Definicja schematu Aktualnosci.
     *
     * @return array
     */
    public static function AktualnosciSchema()
    {
        return [
            'type' => 'object',
            'properties' => [
                'Aktualnosci_id' => ['type' => 'integer', 'format' => 'int64', 'example' => 1],
                'tytul' => ['type' => 'string', 'example' => 'Tytuł aktualności'],
                'opis' => ['type' => 'string', 'example' => 'Opis aktualności'],
                'data_nadania' => ['type' => 'string', 'format' => 'date-time', 'example' => '2024-04-23 12:00:00'],
            ],
            'required' => ['Aktualnosci_id', 'tytul', 'opis', 'data_nadania'],
        ];
    }

    /**
     * @OA\Get(
     *     path="/api/aktualnosci",
     *     tags={"Aktualnosci"},
     *     summary="Pobierz listę aktualności",
     *     description="Pobiera listę aktualności z bazy danych.",
     *     @OA\Response(
     *         response=200,
     *         description="Lista aktualności",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/AktualnosciSchema")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Brak aktualności"
     *     )
     * )
     */

    public function Aktualnosci()
    {
        $Aktualnosci = Aktualnosci::limit(6)->get();

        if ($Aktualnosci->isEmpty()) {
            return response()->json(['message' => 'Brak aktualności'], 404);
        }

        return response()->json(['Aktualnosci' => $Aktualnosci]);
    }

    /**
     * @OA\Get(
     *     path="/api/aktualnosci/{id}",
     *     tags={"Aktualnosci"},
     *     summary="Pobierz pojedynczą aktualność",
     *     description="Pobiera pojedynczą aktualność na podstawie jej ID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID aktualności",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Pojedyncza aktualność",
     *         @OA\JsonContent(ref="#/components/schemas/AktualnosciSchema")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Aktualność nie znaleziona"
     *     )
     * )
     */
    public function show_id($id)
    {
        $news = Aktualnosci::find($id);
        if (!$news) {
            return response()->json(['message' => 'Aktualność nie znaleziona'], 404);
        }
        return response()->json(['news' => $news]);
    }

    /**
     * @OA\Get(
     *     path="/api/aktualnosci_admin",
     *     tags={"Aktualnosci"},
     *     summary="Pobierz wszystkie aktualności",
     *     description="Pobiera wszystkie aktualności z bazy danych.",
     *     @OA\Response(
     *         response=200,
     *         description="Lista wszystkich aktualności",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/AktualnosciSchema")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Brak aktualności"
     *     )
     * )
     */
    public function showALL()
    {
        $news = Aktualnosci::get();
        if ($news->isEmpty()) {
            return response()->json(['message' => 'Aktualność nie znaleziona'], 404);
        }
        return response()->json(['news' => $news]);
    }


    /**
     * @OA\Post(
     *     path="/api/aktualnosci",
     *     tags={"Aktualnosci"},
     *     summary="Dodaj nową aktualność",
     *     description="Dodaje nową aktualność do bazy danych.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/AktualnosciRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Aktualność dodana",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Aktualność dodana"),
     *             @OA\Property(property="news", ref="#/components/schemas/AktualnosciSchema")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        // Ustaw obecną datę jako datę nadania
        $data_nadania = date('Y-m-d H:i:s');

        // Walidacja danych wejściowych
        $validatedData = $request->validate([
            'tytul' => 'required',
            'opis' => 'required',
        ]);

        // Dodaj datę nadania do walidowanych danych
        $validatedData['data_nadania'] = $data_nadania;

        // Utwórz nową aktualność
        $news = Aktualnosci::create($validatedData);

        // Zwróć odpowiedź JSON z informacją o sukcesie i nową aktualnością
        return response()->json(['message' => 'Aktualność dodana', 'news' => $news], 201);
    }

    /**
     * @OA\Put(
     *     path="/api/aktualnosci/{id}",
     *     tags={"Aktualnosci"},
     *     summary="Zaktualizuj istniejącą aktualność",
     *     description="Aktualizuje istniejącą aktualność na podstawie jej ID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID aktualności",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/AktualnosciRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Aktualność zaktualizowana",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Aktualność zaktualizowana"),
     *             @OA\Property(property="news", ref="#/components/schemas/AktualnosciSchema")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Aktualność nie znaleziona"
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        // Znajdź aktualność do aktualizacji
        $news = Aktualnosci::find($id);
        if (!$news) {
            return response()->json(['message' => 'Aktualność nie znaleziona'], 404);
        }

        // Ustaw obecną datę jako datę nadania
        $data_nadania = date('Y-m-d H:i:s');

        // Walidacja danych wejściowych
        $validatedData = $request->validate([
            'tytul' => 'required',
            'opis' => 'required',
        ]);

        // Dodaj obecną datę do walidowanych danych
        $validatedData['data_nadania'] = $data_nadania;

        // Zaktualizuj aktualność
        $news->update($validatedData);

        // Zwróć odpowiedź JSON z informacją o sukcesie oraz zaktualizowaną aktualnością
        return response()->json(['message' => 'Aktualność zaktualizowana', 'news' => $news]);
    }

     /**
     * @OA\Delete(
     *     path="/api/aktualnosci/{id}",
     *     tags={"Aktualnosci"},
     *     summary="Usuń aktualność",
     *     description="Usuwa aktualność na podstawie jej ID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID aktualności",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Aktualność usunięta",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Aktualność usunięta")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Aktualność nie znaleziona"
     *     )
     * )
     */
    public function destroy($id)
    {
        $news = Aktualnosci::find($id);
        if (!$news) {
            return response()->json(['message' => 'Aktualność nie znaleziona'], 404);
        }
        $news->delete();
        return response()->json(['message' => 'Aktualność usunięta']);
    }
}
