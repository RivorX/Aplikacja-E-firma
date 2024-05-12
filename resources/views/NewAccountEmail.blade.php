<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nowe konto w platformie e-firma</title>
</head>
<body style="font-family: Arial, sans-serif;">

    <h2>Witaj!</h2>

    <p>Twoje konto na platformie e-firma zostało pomyślnie utworzone.</p>

    <p>Dane do logowania:</p>

    <ul>
        <li><strong>Login:</strong> {{ $email }}</li>
        <li><strong>Hasło tymczasowe:</strong> {{ $randomPassword }}</li>
    </ul>

    <p>Prosimy o zalogowanie się na swoje konto i zmianę hasła po pierwszym logowaniu.</p>

    <p>
        Pozdrawiamy,<br>
        Zespół e-firma
    </p>

</body>
</html>
