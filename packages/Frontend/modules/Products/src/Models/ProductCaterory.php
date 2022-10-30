<?php

namespace Frontend\Products\Models;

use Frontend\Core\Models\ModelBase;

class ProductCaterory extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'product_categories';

    protected $fillable = [
        'name',
        'status',
        'description'
    ];
}
