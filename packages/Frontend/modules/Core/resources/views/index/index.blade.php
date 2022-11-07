@php
    use Frontend\Core\Core;
@endphp

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="user-scalable=0">
    <!-- Meta SEO -->
    <meta name="description" content="Sàn thương mai điện tử hàng đầu Việt Nam">
    <!-- integrate OGP into a webpage -->
    <meta property="og:title" content="Fanthbol Ecommerce" />
    <meta property="og:description" content="Sàn thương mai điện tử hàng đầu Việt Nam" />
    <meta property="og:url" content="fanthbol.com" />
    <meta property="og:image" content="#link#" />
    <meta property="og:image:width" content="Website image width" />
    <meta property="og:image:height" content="Website image height" />
    <meta property="og:site_name" content="Website name" />
    <!-- Currently available objects are the following:
    (website, article, book, books.author, books.genre, business.business, fitness.course, music.album, music.musician,
    music.playlist, music.radio_station, music.song, object, place, product, product.group, product.item, profile, quick_election.election,
    restaurant, restaurant.menu, restaurant.menu_item, restaurant.menu_section, video.episode, video.movie, video.tv_show, video.other). -->
    <meta property="og:type" content="website">
    <meta property="fb:admins" content="Facebook admin Id number" />
    <meta property="fb:app_id" content="Facebook application Id number" />

    <script type="text/javascript">
        var sparrowConfig = {!! json_encode( Core::config() ) !!};
        const API_URL = '{{ env("APP_API_URL") }}';
    </script>
    <title>MS Mall</title>
    <link rel="shortcut icon" type="image/png" href="/images/msmall-favicon.png"/>
    <link href="{{ Core::mix('css/index.css', '/modules/core') }}" rel="stylesheet" type="text/css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css" type="text/css" rel="stylesheet">
</head>

<body>
    <div id="root" class="wrapper"></div>
    <!-- The Webpack manifest runtime -->
    <!-- <script src="{{ Core::mix('js/manifest.js', '/modules/core') }}"></script> -->
    <!-- Your vendor libraries -->
    <!-- <script src="{{ Core::mix('js/vendor.js', '/modules/core') }}"></script> -->
    <!-- Your application code -->
    <script src="{{ Core::mix('js/index.js', '/modules/core') }}"></script>

    <script></script>
</body>

</html>






