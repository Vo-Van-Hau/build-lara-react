<?php

namespace Frontend\Shop\Models;

use Frontend\Core\Models\ModelBase;

class UserFollowStores extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'user_follow_stores';

    protected $fillable = [
        'user_id', 'store_id'
    ];

    /**=======================
     *     RelationShip
     *=======================*/
}
