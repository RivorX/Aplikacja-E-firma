-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Maj 14, 2024 at 12:53 PM
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

--
-- Dumping data for table `adres_zamieszkania`
--

INSERT INTO `adres_zamieszkania` (`Adres_Zamieszkania_id`, `data_dodania`, `miasto`, `ulica`, `nr_domu`, `kod_pocztowy`) VALUES
(1, '2024-05-11', 'Limanowa', 'Bednarczyka', '36', '34-600'),
(2, '2020-05-20', 'Nowy Sącz', 'Mariana Cyconia', '5', '33-300');

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
  `Strefy_Dostepu_id` int(11) NOT NULL,
  `drzwi_aktywne` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `drzwi`
--

INSERT INTO `drzwi` (`Drzwi_id`, `nr_drzwi`, `nazwa`, `WeWy`, `Strefy_Dostepu_id`, `drzwi_aktywne`) VALUES
(1, '1a', 'Wejście do kuchni. Wyjście z strefa A', 'We/Wy', 2, 1),
(4, '1b', 'Wyjście z kuchni. Wejście do strefy A', 'We/Wy', 1, 1),
(5, '2a', 'Wejście do strefy C. Wyjście z strefy B', 'We/Wy', 4, 1),
(6, '2b', 'Wyjście z strefy C. Wejście do strefy B', 'We/Wy', 3, 1),
(7, '3a', 'Wejście do kuchni. Wyjście z strefy B', 'We/Wy', 2, 1),
(8, '3b', 'Wyjście z kuchni. Wejście do strefy B', 'We/Wy', 3, 1);

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
  `numer_seryjny` varchar(11) NOT NULL,
  `data_wydania` date NOT NULL,
  `data_waznosci` date NOT NULL,
  `karta_aktywna` tinyint(1) NOT NULL,
  `inne_dane` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `karta_dostepu`
--

INSERT INTO `karta_dostepu` (`Karta_Dostepu_id`, `Pracownicy_id`, `numer_seryjny`, `data_wydania`, `data_waznosci`, `karta_aktywna`, `inne_dane`) VALUES
(1, 7, '23432424', '2024-05-04', '2024-05-04', 1, NULL);

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
  `Drzwi_id` int(11) DEFAULT NULL,
  `data_proby` datetime NOT NULL,
  `dostęp_przyznany` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `logi_kart`
--

INSERT INTO `logi_kart` (`Logi_kart_id`, `Karta_Dostepu_id`, `Strefy_Dostepu_id`, `Drzwi_id`, `data_proby`, `dostęp_przyznany`) VALUES
(51, 1, 3, 1, '2024-05-12 12:03:59', 0),
(52, 1, 1, 1, '2024-05-12 09:04:00', 0),
(53, 1, 3, 1, '2024-05-13 08:04:00', 0),
(54, 1, 2, 1, '2024-05-13 05:04:00', 0),
(55, 1, 3, 1, '2024-05-12 13:04:00', 1),
(56, 1, 1, 1, '2024-05-13 06:04:00', 1),
(57, 1, 4, 1, '2024-05-12 09:04:00', 0),
(58, 1, 2, 1, '2024-05-13 00:04:00', 1),
(59, 1, 3, 1, '2024-05-13 04:04:00', 1),
(60, 1, 3, 1, '2024-05-12 18:04:00', 1),
(61, 1, 3, 1, '2024-05-12 09:04:00', 0),
(62, 1, 1, 1, '2024-05-13 03:04:00', 1),
(63, 1, 4, 1, '2024-05-13 06:04:00', 1),
(64, 1, 3, 1, '2024-05-12 10:04:00', 0),
(65, 1, 3, 1, '2024-05-12 21:04:00', 0),
(66, 1, 3, 1, '2024-05-12 16:04:00', 1),
(67, 1, 4, 1, '2024-05-13 02:04:00', 0),
(68, 1, 1, 1, '2024-05-12 13:04:00', 1),
(69, 1, 4, 1, '2024-05-13 05:04:00', 1),
(70, 1, 3, 1, '2024-05-12 15:04:00', 1),
(71, 1, 4, 1, '2024-05-12 20:04:00', 1),
(72, 1, 2, 1, '2024-05-12 14:04:00', 0),
(73, 1, 1, 1, '2024-05-12 20:04:00', 0),
(74, 1, 1, 1, '2024-05-12 17:04:00', 1),
(75, 1, 3, 1, '2024-05-12 23:04:00', 1),
(76, 1, 2, 1, '2024-05-13 02:04:00', 1),
(77, 1, 3, 1, '2024-05-13 07:04:00', 1),
(78, 1, 1, 1, '2024-05-12 14:04:00', 1),
(79, 1, 2, 1, '2024-05-12 09:04:00', 0),
(80, 1, 1, 1, '2024-05-12 09:04:00', 1),
(81, 1, 3, 1, '2024-05-12 10:04:00', 1),
(82, 1, 3, 1, '2024-05-13 08:04:00', 1),
(83, 1, 4, 1, '2024-05-12 19:04:00', 0),
(84, 1, 1, 1, '2024-05-13 02:04:00', 1),
(85, 1, 4, 1, '2024-05-12 13:04:00', 1),
(86, 1, 3, 1, '2024-05-13 03:04:00', 0),
(87, 1, 1, 1, '2024-05-13 05:04:00', 1),
(88, 1, 4, 1, '2024-05-12 09:04:00', 0),
(89, 1, 2, 1, '2024-05-13 07:04:00', 0),
(90, 1, 4, 1, '2024-05-12 13:04:00', 1),
(91, 1, 4, 1, '2024-05-12 20:04:00', 1),
(92, 1, 2, 1, '2024-05-13 07:04:00', 1),
(93, 1, 4, 1, '2024-05-13 08:04:00', 0),
(94, 1, 4, 1, '2024-05-13 00:04:00', 0),
(95, 1, 2, 1, '2024-05-12 18:04:00', 0),
(96, 1, 4, 1, '2024-05-12 22:04:00', 1),
(97, 1, 2, 1, '2024-05-13 08:04:00', 1),
(98, 1, 2, 1, '2024-05-12 21:04:00', 1),
(99, 1, 1, 1, '2024-05-13 03:04:00', 0),
(100, 1, 3, 1, '2024-05-12 17:04:00', 0);

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
-- Struktura tabeli dla tabeli `ogloszenia`
--

CREATE TABLE `ogloszenia` (
  `Ogloszenia_id` int(11) NOT NULL,
  `Pracownicy_id` int(11) NOT NULL,
  `tytul` varchar(45) NOT NULL,
  `opis` text NOT NULL,
  `data_nadania` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ogloszenia`
--

INSERT INTO `ogloszenia` (`Ogloszenia_id`, `Pracownicy_id`, `tytul`, `opis`, `data_nadania`) VALUES
(6, 7, 'Nie do menedzerów', 'hejka 2', '2024-04-29 16:36:19'),
(7, 7, 'Do wszystkich', 'Witajcie w naszej firmie. Miłego dnia <3', '2024-04-29 16:36:40');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ogloszenia_has_stanowisko`
--

CREATE TABLE `ogloszenia_has_stanowisko` (
  `Ogloszenia_id` int(11) NOT NULL,
  `Stanowisko_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ogloszenia_has_stanowisko`
--

INSERT INTO `ogloszenia_has_stanowisko` (`Ogloszenia_id`, `Stanowisko_id`) VALUES
(6, 1),
(6, 9),
(7, 1),
(7, 8),
(7, 9);

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
(37, 'App\\Models\\Pracownicy', 6, 'main', '61a7b85cbdd581733868714c9cf78447e1b54c5224c96224e51f08098df3e09e', '[\"*\"]', '2024-04-29 13:05:27', NULL, '2024-04-28 17:48:38', '2024-04-29 13:05:27'),
(43, 'App\\Models\\Pracownicy', 8, 'main', '8274ab00a1a60299c8796bfb538011379fda69dd8db50e537916b637810d880e', '[\"*\"]', NULL, NULL, '2024-04-29 14:35:35', '2024-04-29 14:35:35'),
(44, 'App\\Models\\Pracownicy', 8, 'main', '82462cf9d558db53b1f052d45747d1f5a3b83eeef0fa9eb75a0dffa942552137', '[\"*\"]', '2024-04-29 14:37:07', NULL, '2024-04-29 14:36:59', '2024-04-29 14:37:07'),
(52, 'App\\Models\\Pracownicy', 7, 'main', '1962b794ede5b046e2d20dd00915d27c4829f85dc5f6428337e447e7a400a4e8', '[\"*\"]', '2024-05-07 11:10:26', NULL, '2024-05-05 09:44:44', '2024-05-07 11:10:26'),
(53, 'App\\Models\\Pracownicy', 7, 'main', 'a8bde012ee3d72d3a53addf1feecfb67eecd768e1ab1424b398b2baa3fd0a0cb', '[\"*\"]', '2024-05-12 16:41:08', NULL, '2024-05-11 10:47:01', '2024-05-12 16:41:08'),
(54, 'App\\Models\\Pracownicy', 7, 'main', '51308d3d59723ccf33116dec567e79d1663aa00a3d3d87992dca900f2f84d4ff', '[\"*\"]', '2024-05-14 08:52:59', NULL, '2024-05-12 16:41:16', '2024-05-14 08:52:59'),
(55, 'App\\Models\\Pracownicy', 9, 'main', '51a401949ee27c9fdc42c7cf8ebd17cde17536bc551cf3d1d5f76e67cbd7c7a0', '[\"*\"]', NULL, NULL, '2024-05-12 16:41:41', '2024-05-12 16:41:41'),
(56, 'App\\Models\\Pracownicy', 10, 'main', '663014fa85a6e01645c2941947ff1c9b6bac0bb9724ba3f599cd559682de01cc', '[\"*\"]', NULL, NULL, '2024-05-12 16:41:52', '2024-05-12 16:41:52');

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
  `Data_edycji` datetime DEFAULT NULL,
  `Data_utworzenia` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `pracownicy`
--

INSERT INTO `pracownicy` (`Pracownicy_id`, `Stanowisko_id`, `Grupy_id`, `email`, `password`, `imie`, `nazwisko`, `konto_aktywne`, `ilosc_dni_urlopu`, `Data_edycji`, `Data_utworzenia`) VALUES
(7, 1, 3, 'admin@example.pl', '$2y$12$G4fTGOhmj1Rom2Wx4sLSiORhzmC2HnB/QmVhzSvVxx.Rpe1lM9vGq', 'Rafał', 'Admin', 1, 0, '2024-05-12 18:41:16', '2024-04-29 15:01:07'),
(8, 8, 1, 'aga@example.pl', '$2y$12$BW/PNqICXw1RlCY4HXXk2.0aDJ5VoSD0m0pm4DCf.0gIpWknf/Nuq', 'Agała', 'Magała', 1, 0, NULL, '2024-04-29 16:35:35'),
(9, 8, 1, 'rm@example.pl', '$2y$12$736I2qwGclz9LFxsp3pX.uVTKUxM9oD2lJ3fN2O7d6kJRt.sieXc.', 'Rafał', 'Madoń', 1, 0, NULL, '2024-05-12 18:41:37'),
(10, 8, 1, 'rm1@example.pl', '$2y$12$DZ7ghIVMndAX0q9K33ia4.28HkUkM3i4tPDAURAd5xZYrw.Fk.g6e', 'Rafał', 'Madoń', 1, 0, NULL, '2024-05-12 18:41:50');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pracownicy_has_adres_zamieszkania`
--

CREATE TABLE `pracownicy_has_adres_zamieszkania` (
  `Pracownicy_id` int(11) NOT NULL,
  `Adres_Zamieszkania_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `pracownicy_has_adres_zamieszkania`
--

INSERT INTO `pracownicy_has_adres_zamieszkania` (`Pracownicy_id`, `Adres_Zamieszkania_id`) VALUES
(7, 1),
(7, 2);

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
('Bf5ZxHYilkMj1BhEA7e1NqjBIO34hYkOVFbpVEGx', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0 (Edition std-1)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMjZUZWpUb3l6Q1dkVUtRMzdWdWtzZkdQZTJydFR3YkppYmFLVTM5UCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1714846690),
('gSzLRxqmcDsELRwsAsJwkminQsXMrJsiBaIzayP9', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0 (Edition std-1)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTW5ueEk2SnJ4WnZJWHhwSGV2SWxXTmxwbmdHUnRtNG1kSGNCNHd6MiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1713696097),
('jogtYTkCIcrgJLd8zVPul4UQ9FCM2BtZ5PsI5w7V', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0 (Edition std-1)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTVFqTUpFMXBhRlUzdTJVazRXTlZud2xuSU80d2pWTjZ4TWpNdmZUbyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1713638117),
('JOUPa0MVzp8xhXMKu5WKeA9N17e2CSa44DUYJgNj', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0 (Edition std-1)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWWFOR0drTGY5bFRuQ1ZuVEpnRFRqZjc3NGxvbGlydTFCOW5jN3FpNyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1713807779),
('k7tQKperE3zKITSD1gjiSuWSkrtRFkQIpwaDynKO', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0 (Edition std-1)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiY0YwdjhXNnJjdk1SQ3BybjJlSTB5UXZYSG84SU45OTh2UUxsN2s0diI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1713642903),
('nNAXiysVc6S4ERXxpYSEXU2n3eWyTpAu4KjFqbvN', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 OPR/107.0.0.0 (Edition std-1)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibHRKUWhLa21zT3dnOTFOZW94OHJNT1VKRWVheFJPeUR6NzY5SVR2byI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1713694710),
('YDjmiODV5eT9SIApsozjuHGfCdURSjPJLeP1Txxt', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0 (Edition std-1)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVjQxUGpQV2JjdjUyN1NOZnRmYjRrRk5PZEpuam5maXoyeW9KZnRzMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1715431603);

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

--
-- Dumping data for table `strefy_dostepu`
--

INSERT INTO `strefy_dostepu` (`Strefy_Dostepu_id`, `nazwa_strefy`) VALUES
(1, 'Strefa A'),
(2, 'Kuchnia'),
(3, 'Strefa B'),
(4, 'Strefa C');

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
  ADD KEY `fk_Karta_Dostepu3_idx` (`Karta_Dostepu_id`),
  ADD KEY `Drzwi_id` (`Drzwi_id`);

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
-- Indeksy dla tabeli `ogloszenia`
--
ALTER TABLE `ogloszenia`
  ADD PRIMARY KEY (`Ogloszenia_id`),
  ADD KEY `fk_Pracownicy1_idx` (`Pracownicy_id`);

--
-- Indeksy dla tabeli `ogloszenia_has_stanowisko`
--
ALTER TABLE `ogloszenia_has_stanowisko`
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
  MODIFY `Adres_Zamieszkania_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `aktualnosci`
--
ALTER TABLE `aktualnosci`
  MODIFY `Aktualnosci_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `badania_okresowe`
--
ALTER TABLE `badania_okresowe`
  MODIFY `Badania_Okresowe_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `drzwi`
--
ALTER TABLE `drzwi`
  MODIFY `Drzwi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  MODIFY `Karta_Dostepu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `logi_kart`
--
ALTER TABLE `logi_kart`
  MODIFY `Logi_kart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

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
-- AUTO_INCREMENT for table `ogloszenia`
--
ALTER TABLE `ogloszenia`
  MODIFY `Ogloszenia_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `pracownicy`
--
ALTER TABLE `pracownicy`
  MODIFY `Pracownicy_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  MODIFY `Strefy_Dostepu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
-- Constraints for table `ogloszenia`
--
ALTER TABLE `ogloszenia`
  ADD CONSTRAINT `fk_Pracownicy1` FOREIGN KEY (`Pracownicy_id`) REFERENCES `pracownicy` (`Pracownicy_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `ogloszenia_has_stanowisko`
--
ALTER TABLE `ogloszenia_has_stanowisko`
  ADD CONSTRAINT `fk_Ogłoszenia1` FOREIGN KEY (`Ogloszenia_id`) REFERENCES `ogloszenia` (`Ogloszenia_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
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
