<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    /**
     * Testuje, czy endpoint /api/login odpowiada poprawnie.
     *
     * @return void
     */
    public function testLoginEndpoint()
    {
        // Wykonaj żądanie POST do endpointu /api/login z przykładowymi danymi
        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        // Sprawdź, czy odpowiedź ma status HTTP 200 (OK)
        $response->assertStatus(200);

        // Sprawdź, czy odpowiedź zawiera oczekiwane dane JSON (możesz dostosować do swoich potrzeb)
        $response->assertJson([
            // Tu możesz umieścić oczekiwane dane JSON zgodnie z odpowiedzią
        ]);
    }
}
