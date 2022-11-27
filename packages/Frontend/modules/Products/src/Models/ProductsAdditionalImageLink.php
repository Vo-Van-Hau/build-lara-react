<?php

namespace Frontend\Products\Models;

use Frontend\Core\Models\ModelBase;

class ProductsAdditionalImageLink extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'products_additional_image_link';

    protected $fillable = [
        'link',
        'status',
        'description'
    ];
}
