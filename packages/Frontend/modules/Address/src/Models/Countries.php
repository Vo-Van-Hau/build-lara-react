<?php

namespace Frontend\Address\Models;

use Frontend\Core\Models\ModelBase;

class Countries extends ModelBase {

    protected $connection = "mysql";
    protected $table = "countries";

    protected $fillable = [];

    /**=======================
     *     RelationShip
     *=======================*/
}
