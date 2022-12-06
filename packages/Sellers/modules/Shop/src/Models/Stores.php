<?php

namespace Sellers\Shop\Models;

use Sellers\Core\Models\ModelBase;

class Stores extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'stores';

    protected $fillable = [
        'name',
        'status',
        'description'
    ];
}
