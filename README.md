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
9. orders: php artisan migrate --path=modules\Orders\database\migrations\2022_09_25_051703_create_orders_table.php
10. order_detail: php artisan migrate --path=modules\Orders\database\migrations\2022_09_26_092614_create_order_detail_table.php
11. order_tracking_status: php artisan migrate --path=modules\Orders\database\migrations\2022_09_26_093713_create_order_tracking_status_table.php
12. areas: php artisan migrate --path=modules\Address\database\migrations\2022_09_26_130755_create_areas_table.php
13. countries: php artisan migrate --path=modules\Address\database\migrations\2022_09_26_095055_create_countries_table.php
14. provinces: php artisan migrate --path=modules\Address\database\migrations\2022_09_26_131435_create_provinces_table.php
15. districts: php artisan migrate --path=modules\Address\database\migrations\2022_09_26_132131_create_districts_table.php
16. wards: php artisan migrate --path=modules\Address\database\migrations\2022_09_26_132237_create_wards_table.php
17. payment_methods: php artisan migrate --path=modules\Payments\database\migrations\2022_09_26_142032_create_payment_methods_table.php
18. product_identifiers: php artisan migrate --path=modules\Products\database\migrations\2022_09_26_142932_create_product_identifiers_table.php
19. suppliers: php artisan migrate --path=modules\Suppliers\database\migrations\2022_09_26_164515_create_suppliers_table.php
20. carts: php artisan migrate --path=modules\Carts\database\migrations\2022_09_26_165845_create_carts_table.php
21. cart_detail: php artisan migrate --path=modules\Carts\database\migrations\2022_09_26_170058_create_cart_detail_table.php
22. product_stock: php artisan migrate --path=modules\Carts\database\migrations\2022_09_26_170720_create_product_stock_table.php
23. currencies: php artisan migrate --path=modules\Currencies\database\migrations\2022_09_26_172605_create_currencies_table.php
23. shipping: php artisan migrate --path=modules\Shipping\database\migrations\2022_09_27_035749_create_shipping_table.php
23. shipping_methods: php artisan migrate --path=modules\Shipping\database\migrations\2022_09_27_041101_create_shipping_methods_table.php
23. shipping_package_weight_cost: php artisan migrate --path=modules\Shipping\database\migrations\2022_09_27_041739_create_shipping_package_weight_cost_table.php
23. shipping_package_dimensions_cost: php artisan migrate --path=modules\Shipping\database\migrations\2022_09_27_042527_create_shipping_package_dimensions_cost_table.php
23. shipping_package_timing_cost: php artisan migrate --path=modules\Shipping\database\migrations\2022_09_27_043045_create_shipping_package_timing_cost_table.php
23. shipping_package_zone_cost: php artisan migrate --path=modules\Shipping\database\migrations\2022_09_27_043441_create_shipping_package_zone_cost_table.php
24. warehouses: php artisan migrate --path=modules\Warehouses\database\migrations\2022_09_27_050523_create_warehouses_table.php
25. contact_types: php artisan migrate --path=modules\Contacts\database\migrations\2022_09_27_051441_create_contact_types_table.php
26. feedbacks: php artisan migrate --path=modules\Contacts\database\migrations\2022_09_27_051817_create_feedbacks_table.php
27. product_description_detail: php artisan migrate --path=modules\Products\database\migrations\2022_09_27_073158_create_product_description_detail_table.php

# ------------------Stop here------------------
## MongoDB and Laravel Integration:
1. The mongodb extension (Link download MongoDB driver for PHP: https://pecl.php.net/package/mongodb) is enabled in your php.ini file. 
- Find the .dll file. Copy it to the ext directory of your XAMPP installation (C:\xampp\php\ext)
- Run command "php -i|findstr "Thread" (on Windows) or command "php -i|grep Thread" (on *nix) to check the version of installed PHP Thread safe or Non Thread Safe.
- Add the following line to your php.ini file: 
        extension=mongodb.so OR extension=php_mongodb.dll
2. Run the following command from your Laravel project directory in order to add the MongoDB package for Laravel:
        composer require jenssegers/mongodb:3.8 (package: "jenssegers/mongodb": "3.8",)
        
