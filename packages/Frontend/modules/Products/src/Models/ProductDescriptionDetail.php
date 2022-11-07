<?php

namespace Frontend\Products\Models;

use Frontend\Core\Models\ModelBase;

class ProductDescriptionDetail extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'product_description_detail';

    protected $fillable = [
        'name',
        'status',
        'description'
    ];
}
