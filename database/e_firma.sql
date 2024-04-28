-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2024 at 11:13 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_firma`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `adres_zamieszkania`
--

CREATE TABLE `adres_zamieszkania` (
  `Adres_Zamieszkania_id` int(11) NOT NULL,
  `data_dodania` date NOT NULL,
  `miasto` varchar(45) NOT NULL,
  `ulica` varchar(45) NOT NULL,
  `nr_domu` varchar(45) NOT NULL,
  `kod_pocztowy` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `aktualnosci`
--

CREATE TABLE `aktualnosci` (
  `Aktualnosci_id` int(11) NOT NULL,
  `tytul` varchar(45) NOT NULL,
  `opis` text NOT NULL,
  `data_nadania` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `aktualnosci`
--

INSERT INTO `aktualnosci` (`Aktualnosci_id`, `tytul`, `opis`, `data_nadania`) VALUES
(1, 'Test', 'Testowy opis aktualnosci', '2024-04-20 23:00:09'),
(2, 'Test', 'Witajcie w aktualności 2. mamy wspaniełe wieści dla was :)\r\nMiłego dnia <3', '2024-04-21 21:32:34');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `badania_okresowe`
--

CREATE TABLE `badania_okresowe` (
  `Badania_Okresowe_id` int(11) NOT NULL,
  `tytul` varchar(45) NOT NULL,
  `opis` varchar(45) DEFAULT NULL,
  `data_badania` date NOT NULL,
  `data_waznosci_badania` date NOT NULL,
  `Pracownicy_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `drzwi`
--

CREATE TABLE `drzwi` (
  `Drzwi_id` int(11) NOT NULL,
  `nr_drzwi` varchar(45) NOT NULL,
  `nazwa` varchar(45) NOT NULL,
  `WeWy` varchar(45) NOT NULL,
  `Strefy_Dostepu_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `grupy`
--

CREATE TABLE `grupy` (
  `Grupy_id` int(11) NOT NULL,
  `nazwa_grupy` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `grupy`
--

INSERT INTO `grupy` (`Grupy_id`, `nazwa_grupy`) VALUES
(1, 'admin'),
(2, 'pracownik'),
(3, 'Super admin');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `karta_dostepu`
--

CREATE TABLE `karta_dostepu` (
  `Karta_Dostepu_id` int(11) NOT NULL,
  `Pracownicy_id` int(11) NOT NULL,
  `numer_seryjny` int(11) NOT NULL,
  `data_wydania` date NOT NULL,
  `data_waznosci` date NOT NULL,
  `inne_dane` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `karta_dostepu_has_strefy_dostepu`
--

CREATE TABLE `karta_dostepu_has_strefy_dostepu` (
  `Karta_Dostepu_id` int(11) NOT NULL,
  `Strefy_Dostepu_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `logi_kart`
--

CREATE TABLE `logi_kart` (
  `Logi_kart_id` int(11) NOT NULL,
  `Karta_Dostepu_id` int(11) NOT NULL,
  `Strefy_Dostepu_id` int(11) NOT NULL,
  `data_proby` datetime NOT NULL,
  `dostęp_przyznany` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_04_16_105351_create_personal_access_tokens_table', 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `nadgodziny`
--

CREATE TABLE `nadgodziny` (
  `Nadgodziny_id` int(11) NOT NULL,
  `Sposob_wykorzystania_urlopu_id` int(11) NOT NULL,
  `Nadgodzinycol` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `obecność_pracowników`
--

CREATE TABLE `obecność_pracowników` (
  `Obecność_pracowników_id` int(11) NOT NULL,
  `Pracownicy_id` int(11) NOT NULL,
  `Data` date NOT NULL,
  `Wejście` datetime NOT NULL,
  `Wyjście` datetime DEFAULT NULL,
  `Ostrzeżenie` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ogłoszenia`
--

CREATE TABLE `ogłoszenia` (
  `Ogloszenia_id` int(11) NOT NULL,
  `Pracownicy_id` int(11) NOT NULL,
  `tytul` varchar(45) NOT NULL,
  `opis` text NOT NULL,
  `data_nadania` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ogłoszenia`
--

INSERT INTO `ogłoszenia` (`Ogloszenia_id`, `Pracownicy_id`, `tytul`, `opis`, `data_nadania`) VALUES
(1, 5, 'Ogłoszenie testowe', 'To jest ogłoszenie testowe, prosze to zignoro', '2024-04-27');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ogłoszenia_has_stanowisko`
--

CREATE TABLE `ogłoszenia_has_stanowisko` (
  `Ogloszenia_id` int(11) NOT NULL,
  `Stanowisko_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ogłoszenia_has_stanowisko`
--

INSERT INTO `ogłoszenia_has_stanowisko` (`Ogloszenia_id`, `Stanowisko_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(25, 'App\\Models\\Pracownicy', 6, 'main', '6014bd6b409be8a13e39ad611f98ced4ab253fbac2803982d5d2941de9ea8fbd', '[\"*\"]', '2024-04-23 07:59:08', NULL, '2024-04-23 07:57:52', '2024-04-23 07:59:08'),
(29, 'App\\Models\\Pracownicy', 5, 'main', 'dc6cddbdef9e30f329903eeb934ec30155a25d3eca8ce6cd29492d66f3634091', '[\"*\"]', '2024-04-27 19:12:48', NULL, '2024-04-27 18:33:12', '2024-04-27 19:12:48');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pracownicy`
--

CREATE TABLE `pracownicy` (
  `Pracownicy_id` int(11) NOT NULL,
  `Stanowisko_id` int(11) NOT NULL,
  `Grupy_id` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `imie` varchar(45) NOT NULL,
  `nazwisko` varchar(45) NOT NULL,
  `konto_aktywne` tinyint(1) NOT NULL,
  `ilosc_dni_urlopu` int(11) NOT NULL,
  `Data_edycji` datetime NOT NULL,
  `Data_utworzenia` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `pracownicy`
--

INSERT INTO `pracownicy` (`Pracownicy_id`, `Stanowisko_id`, `Grupy_id`, `email`, `password`, `imie`, `nazwisko`, `konto_aktywne`, `ilosc_dni_urlopu`, `Data_edycji`, `Data_utworzenia`) VALUES
(3, 1, 1, 'jan2@example.com', '$2y$12$tWBo1N5QNnhorcBp/niKkOrOxeCJ/kqNQHplEHgAYNnstUj7C2cY.', 'Jan', 'Kowalski', 1, 20, '2024-04-17 18:06:41', '2024-04-17 18:06:41'),
(4, 1, 2, 'anna@example.com', '$2y$12$xMdhMqp0nB9bBt/7JUcoH.vKWLqWsgV1JUR.yUwi4nB7GNQ./swwG', 'Anna', 'Nowak', 1, 20, '2024-04-17 18:06:42', '2024-04-17 18:06:42'),
(5, 1, 1, 'jan@example.com', '$2y$12$VslQk626lZQyhwYR70kpzOXaqDvYfLG6KV26HZEJrOecDd.FEqUD6', 'Jan', 'Kowalski', 1, 20, '2024-04-17 20:22:09', '2024-04-17 20:22:09'),
(6, 1, 1, 'rm@example.pl', '$2y$12$xMdhMqp0nB9bBt/7JUcoH.vKWLqWsgV1JUR.yUwi4nB7GNQ./swwG', 'Rafał', 'Madoń', 1, 0, '2024-04-20 21:17:42', '2024-04-20 21:17:42');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pracownicy_has_adres_zamieszkania`
--

CREATE TABLE `pracownicy_has_adres_zamieszkania` (
  `Pracownicy_id` int(11) NOT NULL,
  `Adres_Zamieszkania_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pracownicy_has_szkolenia`
--

CREATE TABLE `pracownicy_has_szkolenia` (
  `Pracownicy_id` int(11) NOT NULL,
  `Szkolenia_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `rodzaj_drzwi_has_logi_kart`
--

CREATE TABLE `rodzaj_drzwi_has_logi_kart` (
  `Drzwi_id` int(11) NOT NULL,
  `Logi_kart_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `rodzaj_etatu`
--

CREATE TABLE `rodzaj_etatu` (
  `Rodzaj_etatu_id` int(11) NOT NULL,
  `Nazwa` varchar(45) NOT NULL,
  `Ilosc_h` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('gSzLRxqmcDsELRwsAsJwkminQsXMrJsiBaIzayP9', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0 (Edition std-1)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTW5ueEk2SnJ4WnZJWHhwSGV2SWxXTmxwbmdHUnRtNG1kSGNCNHd6MiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1713696097),
('jogtYTkCIcrgJLd8zVPul4UQ9FCM2BtZ5PsI5w7V', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0 (Edition std-1)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTVFqTUpFMXBhRlUzdTJVazRXTlZud2xuSU80d2pWTjZ4TWpNdmZUbyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1713638117),
('JOUPa0MVzp8xhXMKu5WKeA9N17e2CSa44DUYJgNj', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0 (Edition std-1)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWWFOR0drTGY5bFRuQ1ZuVEpnRFRqZjc3NGxvbGlydTFCOW5jN3FpNyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1713807779),
('k7tQKperE3zKITSD1gjiSuWSkrtRFkQIpwaDynKO', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0 (Edition std-1)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiY0YwdjhXNnJjdk1SQ3BybjJlSTB5UXZYSG84SU45OTh2UUxsN2s0diI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1713642903),
('nNAXiysVc6S4ERXxpYSEXU2n3eWyTpAu4KjFqbvN', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0 (Edition std-1)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibHRKUWhLa21zT3dnOTFOZW94OHJNT1VKRWVheFJPeUR6NzY5SVR2byI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1713694710);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sposob_wykorzystania_urlopu`
--

CREATE TABLE `sposob_wykorzystania_urlopu` (
  `Sposob_wykorzystania_urlopu_id` int(11) NOT NULL,
  `Nazwa` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `stanowisko`
--

CREATE TABLE `stanowisko` (
  `Stanowisko_id` int(11) NOT NULL,
  `nazwa_stanowiska` varchar(45) NOT NULL,
  `opis` varchar(45) DEFAULT NULL,
  `stawka_h` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `stanowisko`
--

INSERT INTO `stanowisko` (`Stanowisko_id`, `nazwa_stanowiska`, `opis`, `stawka_h`) VALUES
(1, 'Test', 'Testowanie bazy danych', 0),
(8, 'Manager', NULL, 25),
(9, 'Specjalista ds. marketingu', NULL, 20);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `strefy_dostepu`
--

CREATE TABLE `strefy_dostepu` (
  `Strefy_Dostepu_id` int(11) NOT NULL,
  `nazwa_strefy` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `szkolenia`
--

CREATE TABLE `szkolenia` (
  `Szkolenia_id` int(11) NOT NULL,
  `typ` varchar(45) NOT NULL,
  `data_szkolenia` date NOT NULL,
  `nazwa_pliku_szkolenia` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `typ_urlopu`
--

CREATE TABLE `typ_urlopu` (
  `Typ_urlopu_id` int(11) NOT NULL,
  `Nazwa` varchar(45) NOT NULL,
  `czesc_wyplaty` decimal(2,0) NOT NULL COMMENT '0.8 - 80% wyplaty\n0 - 0% wyplaty',
  `Typ_urlopucol` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `urlopy`
--

CREATE TABLE `urlopy` (
  `Urlopy_id` int(11) NOT NULL,
  `Pracownicy_id` int(11) NOT NULL,
  `Dzień_rozp_urlopu` date NOT NULL,
  `Dzień_zak_urlopu` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `urlopy_has_typ_urlopu`
--

CREATE TABLE `urlopy_has_typ_urlopu` (
  `Urlopy_id` int(11) NOT NULL,
  `Typ_urlopu_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wypłata_pracownicza`
--

CREATE TABLE `wypłata_pracownicza` (
  `Wypłata_Pracownicza_id` int(11) NOT NULL,
  `Pracownicy_id` int(11) NOT NULL,
  `Stanowisko_id` int(11) NOT NULL,
  `mies_rok` date NOT NULL,
  `ilosc_h` int(11) NOT NULL,
  `ilosc_nadgodzin` int(11) DEFAULT NULL,
  `premia` decimal(10,0) DEFAULT NULL,
  `wysłana_wypłata` tinyint(1) NOT NULL,
  `Nadgodziny_id` int(11) NOT NULL,
  `Rodzaj_etatu_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wypłata_pracownicza_has_urlopy`
--

CREATE TABLE `wypłata_pracownicza_has_urlopy` (
  `Wypłata_Pracownicza_id` int(11) NOT NULL,
  `Urlopy_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `adres_zamieszkania`
--
ALTER TABLE `adres_zamieszkania`
  ADD PRIMARY KEY (`Adres_Zamieszkania_id`);

--
-- Indeksy dla tabeli `aktualnosci`
--
ALTER TABLE `aktualnosci`
  ADD PRIMARY KEY (`Aktualnosci_id`);

--
-- Indeksy dla tabeli `badania_okresowe`
--
ALTER TABLE `badania_okresowe`
  ADD PRIMARY KEY (`Badania_Okresowe_id`),
  ADD KEY `fk_Pracownicy7_idx` (`Pracownicy_id`);

--
-- Indeksy dla tabeli `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indeksy dla tabeli `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indeksy dla tabeli `drzwi`
--
ALTER TABLE `drzwi`
  ADD PRIMARY KEY (`Drzwi_id`),
  ADD KEY `fk_Strefy_Dostepu3_idx` (`Strefy_Dostepu_id`);

--
-- Indeksy dla tabeli `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeksy dla tabeli `grupy`
--
ALTER TABLE `grupy`
  ADD PRIMARY KEY (`Grupy_id`);

--
-- Indeksy dla tabeli `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indeksy dla tabeli `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `karta_dostepu`
--
ALTER TABLE `karta_dostepu`
  ADD PRIMARY KEY (`Karta_Dostepu_id`),
  ADD KEY `fk_Pracownicy8_idx` (`Pracownicy_id`);

--
-- Indeksy dla tabeli `karta_dostepu_has_strefy_dostepu`
--
ALTER TABLE `karta_dostepu_has_strefy_dostepu`
  ADD PRIMARY KEY (`Karta_Dostepu_id`,`Strefy_Dostepu_id`),
  ADD KEY `fk_Strefy_Dostepu1_idx` (`Strefy_Dostepu_id`),
  ADD KEY `fk_Karta_Dostepu2_idx` (`Karta_Dostepu_id`);

--
-- Indeksy dla tabeli `logi_kart`
--
ALTER TABLE `logi_kart`
  ADD PRIMARY KEY (`Logi_kart_id`),
  ADD KEY `fk_Strefy_Dostepu2_idx` (`Strefy_Dostepu_id`),
  ADD KEY `fk_Karta_Dostepu3_idx` (`Karta_Dostepu_id`);

--
-- Indeksy dla tabeli `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `nadgodziny`
--
ALTER TABLE `nadgodziny`
  ADD PRIMARY KEY (`Nadgodziny_id`),
  ADD KEY `fk_Sposob_wykorzystania_urlopu1_idx` (`Sposob_wykorzystania_urlopu_id`);

--
-- Indeksy dla tabeli `obecność_pracowników`
--
ALTER TABLE `obecność_pracowników`
  ADD PRIMARY KEY (`Obecność_pracowników_id`),
  ADD KEY `fk_Pracownicy6_idx` (`Pracownicy_id`);

--
-- Indeksy dla tabeli `ogłoszenia`
--
ALTER TABLE `ogłoszenia`
  ADD PRIMARY KEY (`Ogloszenia_id`),
  ADD KEY `fk_Pracownicy1_idx` (`Pracownicy_id`);

--
-- Indeksy dla tabeli `ogłoszenia_has_stanowisko`
--
ALTER TABLE `ogłoszenia_has_stanowisko`
  ADD PRIMARY KEY (`Ogloszenia_id`,`Stanowisko_id`),
  ADD KEY `fk_Stanowisko3_idx` (`Stanowisko_id`),
  ADD KEY `fk_Ogłoszenia1_idx` (`Ogloszenia_id`);

--
-- Indeksy dla tabeli `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeksy dla tabeli `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeksy dla tabeli `pracownicy`
--
ALTER TABLE `pracownicy`
  ADD PRIMARY KEY (`Pracownicy_id`),
  ADD KEY `fk_Stanowisko1_idx` (`Stanowisko_id`),
  ADD KEY `fk_Grupy1_idx` (`Grupy_id`);

--
-- Indeksy dla tabeli `pracownicy_has_adres_zamieszkania`
--
ALTER TABLE `pracownicy_has_adres_zamieszkania`
  ADD PRIMARY KEY (`Pracownicy_id`,`Adres_Zamieszkania_id`),
  ADD KEY `fk_Adres_Zamieszkania1_idx` (`Adres_Zamieszkania_id`),
  ADD KEY `fk_Pracownicy3_idx` (`Pracownicy_id`);

--
-- Indeksy dla tabeli `pracownicy_has_szkolenia`
--
ALTER TABLE `pracownicy_has_szkolenia`
  ADD PRIMARY KEY (`Pracownicy_id`,`Szkolenia_id`),
  ADD KEY `fk_Szkolenia1_idx` (`Szkolenia_id`),
  ADD KEY `fk_Pracownicy2_idx` (`Pracownicy_id`);

--
-- Indeksy dla tabeli `rodzaj_drzwi_has_logi_kart`
--
ALTER TABLE `rodzaj_drzwi_has_logi_kart`
  ADD PRIMARY KEY (`Drzwi_id`,`Logi_kart_id`),
  ADD KEY `fk_Logi_kart1_idx` (`Logi_kart_id`),
  ADD KEY `fk_Rodzaj_drzwi1_idx` (`Drzwi_id`);

--
-- Indeksy dla tabeli `rodzaj_etatu`
--
ALTER TABLE `rodzaj_etatu`
  ADD PRIMARY KEY (`Rodzaj_etatu_id`);

--
-- Indeksy dla tabeli `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeksy dla tabeli `sposob_wykorzystania_urlopu`
--
ALTER TABLE `sposob_wykorzystania_urlopu`
  ADD PRIMARY KEY (`Sposob_wykorzystania_urlopu_id`);

--
-- Indeksy dla tabeli `stanowisko`
--
ALTER TABLE `stanowisko`
  ADD PRIMARY KEY (`Stanowisko_id`);

--
-- Indeksy dla tabeli `strefy_dostepu`
--
ALTER TABLE `strefy_dostepu`
  ADD PRIMARY KEY (`Strefy_Dostepu_id`);

--
-- Indeksy dla tabeli `szkolenia`
--
ALTER TABLE `szkolenia`
  ADD PRIMARY KEY (`Szkolenia_id`);

--
-- Indeksy dla tabeli `typ_urlopu`
--
ALTER TABLE `typ_urlopu`
  ADD PRIMARY KEY (`Typ_urlopu_id`);

--
-- Indeksy dla tabeli `urlopy`
--
ALTER TABLE `urlopy`
  ADD PRIMARY KEY (`Urlopy_id`),
  ADD KEY `fk_Pracownicy5_idx` (`Pracownicy_id`);

--
-- Indeksy dla tabeli `urlopy_has_typ_urlopu`
--
ALTER TABLE `urlopy_has_typ_urlopu`
  ADD PRIMARY KEY (`Urlopy_id`,`Typ_urlopu_id`),
  ADD KEY `fk_Typ_urlopu1_idx` (`Typ_urlopu_id`),
  ADD KEY `fk_Urlopy1_idx` (`Urlopy_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indeksy dla tabeli `wypłata_pracownicza`
--
ALTER TABLE `wypłata_pracownicza`
  ADD PRIMARY KEY (`Wypłata_Pracownicza_id`),
  ADD KEY `fk_Pracownicy4_idx` (`Pracownicy_id`),
  ADD KEY `fk_Stanowisko2_idx` (`Stanowisko_id`),
  ADD KEY `fk_Nadgodziny1_idx` (`Nadgodziny_id`),
  ADD KEY `fk_Rodzaj_etatu1_idx` (`Rodzaj_etatu_id`);

--
-- Indeksy dla tabeli `wypłata_pracownicza_has_urlopy`
--
ALTER TABLE `wypłata_pracownicza_has_urlopy`
  ADD PRIMARY KEY (`Wypłata_Pracownicza_id`,`Urlopy_id`),
  ADD KEY `fk_Urlopy2_idx` (`Urlopy_id`),
  ADD KEY `fk_Wypłata_Pracownicza1_idx` (`Wypłata_Pracownicza_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adres_zamieszkania`
--
ALTER TABLE `adres_zamieszkania`
  MODIFY `Adres_Zamieszkania_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `aktualnosci`
--
ALTER TABLE `aktualnosci`
  MODIFY `Aktualnosci_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `badania_okresowe`
--
ALTER TABLE `badania_okresowe`
  MODIFY `Badania_Okresowe_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `drzwi`
--
ALTER TABLE `drzwi`
  MODIFY `Drzwi_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grupy`
--
ALTER TABLE `grupy`
  MODIFY `Grupy_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `karta_dostepu`
--
ALTER TABLE `karta_dostepu`
  MODIFY `Karta_Dostepu_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `logi_kart`
--
ALTER TABLE `logi_kart`
  MODIFY `Logi_kart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `nadgodziny`
--
ALTER TABLE `nadgodziny`
  MODIFY `Nadgodziny_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `obecność_pracowników`
--
ALTER TABLE `obecność_pracowników`
  MODIFY `Obecność_pracowników_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ogłoszenia`
--
ALTER TABLE `ogłoszenia`
  MODIFY `Ogloszenia_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `pracownicy`
--
ALTER TABLE `pracownicy`
  MODIFY `Pracownicy_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `rodzaj_etatu`
--
ALTER TABLE `rodzaj_etatu`
  MODIFY `Rodzaj_etatu_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sposob_wykorzystania_urlopu`
--
ALTER TABLE `sposob_wykorzystania_urlopu`
  MODIFY `Sposob_wykorzystania_urlopu_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stanowisko`
--
ALTER TABLE `stanowisko`
  MODIFY `Stanowisko_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `strefy_dostepu`
--
ALTER TABLE `strefy_dostepu`
  MODIFY `Strefy_Dostepu_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `szkolenia`
--
ALTER TABLE `szkolenia`
  MODIFY `Szkolenia_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `typ_urlopu`
--
ALTER TABLE `typ_urlopu`
  MODIFY `Typ_urlopu_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `urlopy`
--
ALTER TABLE `urlopy`
  MODIFY `Urlopy_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wypłata_pracownicza`
--
ALTER TABLE `wypłata_pracownicza`
  MODIFY `Wypłata_Pracownicza_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `badania_okresowe`
--
ALTER TABLE `badania_okresowe`
  ADD CONSTRAINT `fk_Pracownicy7` FOREIGN KEY (`Pracownicy_id`) REFERENCES `pracownicy` (`Pracownicy_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `drzwi`
--
ALTER TABLE `drzwi`
  ADD CONSTRAINT `fk_Strefy_Dostepu3` FOREIGN KEY (`Strefy_Dostepu_id`) REFERENCES `strefy_dostepu` (`Strefy_Dostepu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `karta_dostepu`
--
ALTER TABLE `karta_dostepu`
  ADD CONSTRAINT `fk_Pracownicy8` FOREIGN KEY (`Pracownicy_id`) REFERENCES `pracownicy` (`Pracownicy_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `karta_dostepu_has_strefy_dostepu`
--
ALTER TABLE `karta_dostepu_has_strefy_dostepu`
  ADD CONSTRAINT `fk_Karta_Dostepu2` FOREIGN KEY (`Karta_Dostepu_id`) REFERENCES `karta_dostepu` (`Karta_Dostepu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Strefy_Dostepu1` FOREIGN KEY (`Strefy_Dostepu_id`) REFERENCES `strefy_dostepu` (`Strefy_Dostepu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `logi_kart`
--
ALTER TABLE `logi_kart`
  ADD CONSTRAINT `fk_Karta_Dostepu3` FOREIGN KEY (`Karta_Dostepu_id`) REFERENCES `karta_dostepu` (`Karta_Dostepu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Strefy_Dostepu2` FOREIGN KEY (`Strefy_Dostepu_id`) REFERENCES `strefy_dostepu` (`Strefy_Dostepu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `nadgodziny`
--
ALTER TABLE `nadgodziny`
  ADD CONSTRAINT `fk_Sposob_wykorzystania_urlopu1` FOREIGN KEY (`Sposob_wykorzystania_urlopu_id`) REFERENCES `sposob_wykorzystania_urlopu` (`Sposob_wykorzystania_urlopu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `obecność_pracowników`
--
ALTER TABLE `obecność_pracowników`
  ADD CONSTRAINT `fk_Pracownicy6` FOREIGN KEY (`Pracownicy_id`) REFERENCES `pracownicy` (`Pracownicy_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `ogłoszenia`
--
ALTER TABLE `ogłoszenia`
  ADD CONSTRAINT `fk_Pracownicy1` FOREIGN KEY (`Pracownicy_id`) REFERENCES `pracownicy` (`Pracownicy_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `ogłoszenia_has_stanowisko`
--
ALTER TABLE `ogłoszenia_has_stanowisko`
  ADD CONSTRAINT `fk_Ogłoszenia1` FOREIGN KEY (`Ogloszenia_id`) REFERENCES `ogłoszenia` (`Ogloszenia_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Stanowisko3` FOREIGN KEY (`Stanowisko_id`) REFERENCES `stanowisko` (`Stanowisko_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pracownicy`
--
ALTER TABLE `pracownicy`
  ADD CONSTRAINT `fk_Grupy1` FOREIGN KEY (`Grupy_id`) REFERENCES `grupy` (`Grupy_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Stanowisko1` FOREIGN KEY (`Stanowisko_id`) REFERENCES `stanowisko` (`Stanowisko_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pracownicy_has_adres_zamieszkania`
--
ALTER TABLE `pracownicy_has_adres_zamieszkania`
  ADD CONSTRAINT `fk_Adres_Zamieszkania1` FOREIGN KEY (`Adres_Zamieszkania_id`) REFERENCES `adres_zamieszkania` (`Adres_Zamieszkania_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Pracownicy3` FOREIGN KEY (`Pracownicy_id`) REFERENCES `pracownicy` (`Pracownicy_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pracownicy_has_szkolenia`
--
ALTER TABLE `pracownicy_has_szkolenia`
  ADD CONSTRAINT `fk_Pracownicy2` FOREIGN KEY (`Pracownicy_id`) REFERENCES `pracownicy` (`Pracownicy_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Szkolenia1` FOREIGN KEY (`Szkolenia_id`) REFERENCES `szkolenia` (`Szkolenia_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `rodzaj_drzwi_has_logi_kart`
--
ALTER TABLE `rodzaj_drzwi_has_logi_kart`
  ADD CONSTRAINT `fk_Logi_kart1` FOREIGN KEY (`Logi_kart_id`) REFERENCES `logi_kart` (`Logi_kart_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Rodzaj_drzwi1` FOREIGN KEY (`Drzwi_id`) REFERENCES `drzwi` (`Drzwi_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `urlopy`
--
ALTER TABLE `urlopy`
  ADD CONSTRAINT `fk_Pracownicy5` FOREIGN KEY (`Pracownicy_id`) REFERENCES `pracownicy` (`Pracownicy_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `urlopy_has_typ_urlopu`
--
ALTER TABLE `urlopy_has_typ_urlopu`
  ADD CONSTRAINT `fk_Typ_urlopu1` FOREIGN KEY (`Typ_urlopu_id`) REFERENCES `typ_urlopu` (`Typ_urlopu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Urlopy1` FOREIGN KEY (`Urlopy_id`) REFERENCES `urlopy` (`Urlopy_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `wypłata_pracownicza`
--
ALTER TABLE `wypłata_pracownicza`
  ADD CONSTRAINT `fk_Nadgodziny1` FOREIGN KEY (`Nadgodziny_id`) REFERENCES `nadgodziny` (`Nadgodziny_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Pracownicy4` FOREIGN KEY (`Pracownicy_id`) REFERENCES `pracownicy` (`Pracownicy_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Rodzaj_etatu1` FOREIGN KEY (`Rodzaj_etatu_id`) REFERENCES `rodzaj_etatu` (`Rodzaj_etatu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Stanowisko2` FOREIGN KEY (`Stanowisko_id`) REFERENCES `stanowisko` (`Stanowisko_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `wypłata_pracownicza_has_urlopy`
--
ALTER TABLE `wypłata_pracownicza_has_urlopy`
  ADD CONSTRAINT `fk_Urlopy2` FOREIGN KEY (`Urlopy_id`) REFERENCES `urlopy` (`Urlopy_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Wypłata_Pracownicza1` FOREIGN KEY (`Wypłata_Pracownicza_id`) REFERENCES `wypłata_pracownicza` (`Wypłata_Pracownicza_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
