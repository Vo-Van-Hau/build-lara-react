<?php

namespace Sellers\Settings\Models;

use Sellers\Core\Models\ModelBase;

class Settings extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'settings';

    protected $fillable = [];

    /**=======================
     *     RelationShip
     *=======================*/
}
