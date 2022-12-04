<?php

namespace Frontend\Address\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Address\Models\Wards;

class Districts extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'districts';

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
    public function wards() {
        return $this->hasMany(Wards::class, 'district_id', 'id')
        ->where([
            'wards.status' => 1,
            'wards.deleted' => 0
        ]);
    }
}
