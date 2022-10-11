<?php

namespace Frontend\Address\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Address\Models\Provinces;

class Countries extends ModelBase {

    protected $connection = "mysql";
    protected $table = "countries";

    protected $fillable = [];

    /**=======================
     *     RelationShip
     *=======================*/

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @param:
    * @return
    */
    public function provinces() {
        return $this->hasMany(Provinces::class, "country_id", "id")
        ->where([
            "provinces.status"      => 1,
            "provinces.deleted"     => 0
        ]);
    }
}
