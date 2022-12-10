<?php

namespace Sellers\Sellers\Models;

use Sellers\Core\Models\ModelBase;

class Sellers extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'sellers';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'status',
        'description'
    ];
}
