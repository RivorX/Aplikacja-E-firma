<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>
<p align="center"><a href="https://reactjs.org/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="150" alt="React Logo"></a></p>

<p align="center"><img src="react\public\logo.jpg" width="150" alt="E-Firma Logo"></a></p>

## O Projekcie

Nasz projekt wykorzystuje **Laravel** jako backend i **React** jako frontend. Poniżej znajdziesz kroki, które należy wykonać, aby uruchomić projekt na swoim lokalnym środowisku.

## Wymagania

Przed rozpoczęciem upewnij się, że masz zainstalowane następujące oprogramowanie:

- [PHP](https://www.php.net/) >= 7.3
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) >= 12.x
- [npm](https://www.npmjs.com/) lub [Yarn](https://yarnpkg.com/)

## Instalacja

1. Sklonuj repozytorium:
   git clone https://github.com/RivorX/Aplikacja-E-firma
   cd Aplikacja-E-firma

2. Zainstaluj zależności PHP:
    composer install (?)


## Uruchomienie Aplikacji

1. Uruchomienie bazy danych pod portem 3306, bazę zaimportować z pliku który znajduje się w '/database/e_firma.sql' do utworzonej wcześniej bazy, którą należy nazwać 'e_firma'
2. W projekcie uruchomić serwer laravela poeceniem: php artisan serve
3. Przejść w 2 konsoli do katalogu react: cd /react
4. Uruchomić serwer react: npm run dev
5. Przejść pod stronę [localhost](http://localhost:3000) gdzie znajduje się Frontent aplikacji