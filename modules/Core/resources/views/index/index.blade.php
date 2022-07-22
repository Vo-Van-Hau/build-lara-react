@php
    use Modules\Core\Core;
@endphp

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="tiny-mce-api-key" content="{{ env('TINY_MCE_API_KEY') }}">
    <meta name="viewport" content="user-scalable=0">
    <script type="text/javascript">
        var sparrowConfig = {!! json_encode( Core::config() ) !!};
        const API_URL = '{{ env("APP_API_URL") }}';
    </script>
    <title>CMS</title>
    <link href="{{ Core::mix('css/index.css', '/modules/core') }}" rel="stylesheet" type="text/css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css" type="text/css" rel="stylesheet">
</head>

<body class="sidebar-mini layout-fixed text-sm">

    <div id="root" class="wrapper"></div>
    Hello World

    <!-- The Webpack manifest runtime -->
    <script src="{{ Core::mix('js/manifest.js', '/modules/core') }}"></script>
    <!-- Your vendor libraries -->
    <script src="{{ Core::mix('js/vendor.js', '/modules/core') }}"></script>
    <!-- Your application code -->
    <script src="{{ Core::mix('js/index.js', '/modules/core') }}"></script>
</body>

</html>
