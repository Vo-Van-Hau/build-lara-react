<?php

namespace Frontend\Shop\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Shop\Models\UserFollowStores;

class Stores extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'stores';

    protected $fillable = [];

    /**=======================
     *     RelationShip
     *=======================*/

     public function user_follow_stores() {
        return $this->hasMany(UserFollowStores::class, 'store_id', 'id')
        ->where([
            'status' => 1,
            'deleted' => 0,
        ]);
     }
}
