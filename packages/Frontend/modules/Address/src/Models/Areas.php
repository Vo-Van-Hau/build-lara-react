<?php

namespace Frontend\Address\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Address\Models\CustomerAddress;

class Areas extends ModelBase {

    protected $connection = "mysql";
    protected $table = "areas";

    protected $fillable = [
        "name"
    ];

    /**=======================
     *     RelationShip
     *=======================*/

     /**
      * @author: <hauvo1709@gmail.com>
      * @todo:
      * @param:
      * @return
      */
     public function customer_address() {
        // return $this->hasMany(CustomerAddress::class, "area_id", "id");
     }
}
