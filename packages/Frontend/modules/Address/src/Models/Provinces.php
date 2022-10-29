<?php

namespace Frontend\Address\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Address\Models\Districts;

class Provinces extends ModelBase {

    protected $connection = "mysql";
    protected $table = "provinces";

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
    public function districts() {
        return $this->hasMany(Districts::class, "province_id", "id")
        ->where([
            "districts.status"      => 1,
            "districts.deleted"     => 0
        ]);
    }
}
