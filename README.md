# start project
1. install composer: 
        composer install
2. dump composer: 
        composer dump-autoload
3. generate application key: 
        php artisan key:generate
4. clear cache: 
        php artisan cache:clear
5. node_modules:
        npm install 

# run mixing module
npm run mix watch {resource} {module}

# build source by webpack
npm run build-by-webpack --source={resource} --module={module}

# Migration
1. users: php artisan migrate --path=modules\Users\database\migrations\2022_08_21_115601_create_users_table.php
