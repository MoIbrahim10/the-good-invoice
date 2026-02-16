<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="The Good Invoice" />
        <link rel="manifest" href="/site.webmanifest" />

        @php
            $appName = config('app.name', 'The Good Invoice');
            $appUrl = config('app.url');
            $ogImage = $appUrl . '/Preview-2x.png';
            $ogDescription = 'Create and manage professional invoices with The Good Invoice.';
        @endphp
        <meta property="og:type" content="website" />
        <meta property="og:url" content="{{ $appUrl }}" />
        <meta property="og:title" content="{{ $appName }}" />
        <meta property="og:description" content="{{ $ogDescription }}" />
        <meta property="og:image" content="{{ $ogImage }}" />
        <meta property="og:image:secure_url" content="{{ $ogImage }}" />
        <meta property="og:site_name" content="{{ $appName }}" />
        <meta property="og:locale" content="{{ str_replace('_', '-', app()->getLocale()) }}" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="{{ $appName }}" />
        <meta name="twitter:description" content="{{ $ogDescription }}" />
        <meta name="twitter:image" content="{{ $ogImage }}" />

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
