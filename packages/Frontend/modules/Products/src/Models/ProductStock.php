<?php

namespace Frontend\Products\Models;

use Frontend\Core\Models\ModelBase;

class ProductStock extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'product_stock';

    protected $fillable = [
        'name',
        'status',
        'description'
    ];
}
