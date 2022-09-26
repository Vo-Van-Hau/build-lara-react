# Start project
1. install composer: 
        composer install/update
2. update configuration:
        Create .env file from .env-example
3. dump composer: 
        composer dump-autoload
4. generate application key: 
        php artisan key:generate
5. clear cache: 
        php artisan cache:clear
6. node_modules:
        npm install 

# Run mixing module
npm run mix watch {resource} {module}

# Build source by webpack
npm run build-by-webpack --source={resource} --module={module}

# Migration
1. users: 
    php artisan migrate --path=modules\Users\database\migrations\2022_08_21_115601_create_users_table.php
    php artisan migrate --path=modules\Users\database\migrations\2022_08_24_171110_add_is_publisher_column_to_users_table.php
2. roles: php artisan migrate --path=modules\Users\database\migrations\2022_08_21_181616_create_roles_table.php
3. acl_role: php artisan migrate --path=modules\Users\database\migrations\2022_08_21_183620_create_acl_role_table.php
4. groups: php artisan migrate --path=modules\Users\database\migrations\2022_08_22_095100_create_groups_table.php
5. user_group: php artisan migrate --path=modules\Users\database\migrations\2022_08_22_100128_create_user_group_table.php
6. publishers: php artisan migrate --path=modules\Publishers\database\migrations\2022_08_28_043811_create_publishers_table.php
7. user_publisher: php artisan migrate --path=modules\Users\database\migrations\2022_08_28_081632_create_user_publisher_table.php
8. products: php artisan migrate --path=modules\Products\database\migrations\2022_09_25_042220_create_products_table.php

# ------------------Stop here------------------
## MongoDB and Laravel Integration:
1. The mongodb extension (Link download MongoDB driver for PHP: https://pecl.php.net/package/mongodb) is enabled in your php.ini file. 
- Find the .dll file. Copy it to the ext directory of your XAMPP installation (C:\xampp\php\ext)
- Run command "php -i|findstr "Thread" (on Windows) or command "php -i|grep Thread" (on *nix) to check the version of installed PHP Thread safe or Non Thread Safe.
- Add the following line to your php.ini file: 
        extension=mongodb.so OR extension=php_mongodb.dll
2. Run the following command from your Laravel project directory in order to add the MongoDB package for Laravel:
        composer require jenssegers/mongodb:3.8 (package: "jenssegers/mongodb": "3.8",)
