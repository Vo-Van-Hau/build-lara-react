# start project
1. install composer: 
        composer install
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

# run mixing module
npm run mix watch {resource} {module}

# build source by webpack
npm run build-by-webpack --source={resource} --module={module}

# Migration
1. users: php artisan migrate --path=modules\Users\database\migrations\2022_08_21_115601_create_users_table.php
2. roles: php artisan migrate --path=modules\Users\database\migrations\2022_08_21_181616_create_roles_table.php
3. acl_role: php artisan migrate --path=modules\Users\database\migrations\2022_08_21_183620_create_acl_role_table.php
4. groups: php artisan migrate --path=modules\Users\database\migrations\2022_08_22_095100_create_groups_table.php
5. user_group: php artisan migrate --path=modules\Users\database\migrations\2022_08_22_100128_create_user_group_table.php
