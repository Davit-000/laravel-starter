<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ mix('js/admin/admin.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <!-- Styles -->
    <link href="{{ mix('css/admin/admin.css') }}" rel="stylesheet">
</head>
<body>
<div id="app" data-auth="{{$auth}}">
    <v-app ref="app">
        @yield('navigation')

        @yield('toolbar')

        <v-content>
            @yield('content')
        </v-content>

        <v-footer app>
            <!-- -->
        </v-footer>

{{--        <snackbar></snackbar>--}}
    </v-app>
</div>
</body>
</html>
