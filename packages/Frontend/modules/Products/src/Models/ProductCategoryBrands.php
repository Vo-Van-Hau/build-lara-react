<?php

namespace Frontend\Products\Models;

use Frontend\Core\Models\ModelBase;

class ProductCategoryBrands extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'product_category_brands';

    protected $fillable = [];
}
