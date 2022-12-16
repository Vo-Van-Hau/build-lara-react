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
24. shipping: php artisan migrate --path=modules\Shipping\database\migrations\2022_09_27_035749_create_shipping_table.php
25. shipping_methods: php artisan migrate --path=modules\Shipping\database\migrations\2022_09_27_041101_create_shipping_methods_table.php
26. shipping_package_weight_cost: php artisan migrate --path=modules\Shipping\database\migrations\2022_09_27_041739_create_shipping_package_weight_cost_table.php
27. shipping_package_dimensions_cost: php artisan migrate --path=modules\Shipping\database\migrations\2022_09_27_042527_create_shipping_package_dimensions_cost_table.php
28. shipping_package_timing_cost: php artisan migrate --path=modules\Shipping\database\migrations\2022_09_27_043045_create_shipping_package_timing_cost_table.php
29. shipping_package_zone_cost: php artisan migrate --path=modules\Shipping\database\migrations\2022_09_27_043441_create_shipping_package_zone_cost_table.php
30. warehouses: php artisan migrate --path=modules\Warehouses\database\migrations\2022_09_27_050523_create_warehouses_table.php
31. contact_types: php artisan migrate --path=modules\Contacts\database\migrations\2022_09_27_051441_create_contact_types_table.php
32. feedbacks: php artisan migrate --path=modules\Contacts\database\migrations\2022_09_27_051817_create_feedbacks_table.php
33. product_description_detail: php artisan migrate --path=modules\Products\database\migrations\2022_09_27_073158_create_product_description_detail_table.php
34. sellers: php artisan migrate --path=modules\Sellers\database\migrations\2022_09_28_093230_create_sellers_table.php
35. customers: php artisan migrate --path=modules\Users\database\migrations\2022_09_28_111040_create_customers_table.php
35. product_seller: php artisan migrate --path=modules\Products\database\migrations\2022_09_28_112407_create_product_seller_table.php
36. customer_address: php artisan migrate --path=modules\Address\database\migrations\2022_09_28_183311_create_customer_address_table.php
37. stores: php artisan migrate --path=modules\Sellers\database\migrations\2022_09_30_062957_create_stores_table.php
38. jobs: php artisan migrate --path=database\migrations\2022_09_30_104757_create_jobs_table.php
39. failed_jobs: php artisan migrate --path=database\migrations\2019_08_19_000000_create_failed_jobs_table.php
40. all-migrations: php artisan migrate 
41. product_categories: php artisan migrate --path=modules\Products\database\migrations\2022_10_21_051701_create_product_categories_table.php
42. products_additional_image_link: php artisan migrate --path=modules\Products\database\migrations\2022_11_26_052331_create_products_additional_image_link_table.php
43. order_tracking_details: php artisan migrate --path=modules\Orders\database\migrations\2022_11_30_054126_create_order_tracking_details_table.php
44. order_tracking_group_status: php artisan migrate --path=modules/Orders/database/migrations/2022_12_03_074146_create_order_tracking_group_status.php
44. product_category_brands: php artisan migrate --path=modules/Products/database/migrations/2022_12_11_034558_create_product_category_brands.php
45. user_follow_stores: php artisan migrate --path=modules/Sellers/database/migrations/2022_12_15_163818_create_user_follow_stores.php

# Jobs
1. php artisan queue:work --queue=sendinvoice

# ------------------Third Party Libs Docs-----------------------
https://github.com/lokalise/php-lokalise-api
https://cloud.google.com/translate/docs/setup
https://googleapis.github.io/google-cloud-php/#/docs/google-cloud/v0.153.0/translate/v2/translateclient

# ------------------Stop here------------------
## MongoDB and Laravel Integration:
1. The mongodb extension (Link download MongoDB driver for PHP: https://pecl.php.net/package/mongodb) is enabled in your php.ini file. 
- Find the .dll file. Copy it to the ext directory of your XAMPP installation (C:\xampp\php\ext)
- Run command "php -i|findstr "Thread" (on Windows) or command "php -i|grep Thread" (on *nix) to check the version of installed PHP Thread safe or Non Thread Safe.
- Add the following line to your php.ini file: 
        extension=mongodb.so OR extension=php_mongodb.dll
2. Run the following command from your Laravel project directory in order to add the MongoDB package for Laravel:
        composer require jenssegers/mongodb:3.8 (package: "jenssegers/mongodb": "3.8",)
        
