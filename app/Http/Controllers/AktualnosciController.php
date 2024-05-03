<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Aktualnosci;
 
/**
 * @OA\Info(
 *      version="1.0.0",
 *      title="API",
 *      description="API do zarządzania aktualnościami",
 *      @OA\Contact(
 *          email="admin@localhost"
 *      )
 * )
 */
class AktualnosciController extends Controller
{
    /**
     * @OA\Get(
     *      path="/api/aktualnosci",
     *      tags={"Aktualnosci"},
     *      summary="Pobierz listę aktualności",
     *      description="Pobiera listę aktualności z bazy danych.",
     *      @OA\Response(
     *          response="200",
     *          description="Lista aktualności",
     *          @OA\JsonContent(
     *              type="array",
     *              items=@OA\JsonContent(
     *                  ref="#/components/schemas/Aktualnosci"
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *          response="404",
     *          description="Brak aktualności",
     *          @OA\JsonContent(
     *              type="object",
     *              properties={
     *                  @OA\Property(property="message", type="string", example="Brak aktualności")
     *              }
     *          )
     *      )
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
     *      path="/api/aktualnosci/{id}",
     *      tags={"Aktualnosci"},
     *      summary="Pobierz aktualność",
     *      description="Pobiera aktualność z bazy danych.",
     *      @OA\Parameter(
     *          name="id",
     *          description="ID aktualności",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Aktualność",
     *          @OA\JsonContent(
     *              ref="#/components/schemas/Aktualnosci"
     *          )
     *      ),
     *      @OA\Response(
     *          response="404",
     *          description="Aktualność nie znaleziona",
     *          @OA\JsonContent(
     *              type="object",
     *              properties={
     *                  @OA\Property(property="message", type="string", example="Aktualność nie znaleziona")
     *              }
     *          )
     *      )
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

    public function showALL()
    {
        $news = Aktualnosci::get();
        if ($news->isEmpty()) {
            return response()->json(['message' => 'Aktualność nie znaleziona'], 404);
        }
        return response()->json(['news' => $news]);
    }

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
