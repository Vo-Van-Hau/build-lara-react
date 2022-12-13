<?php

namespace Frontend\Sellers\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Shop\Models\Stores;

class Sellers extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'sellers';
    protected $primaryKey = 'id';
    protected $fillable = [];

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo
     * @param array $brand_ids
     * @return
     */
    public function get_seller_ids_by_stores($store_ids = []) : array {
        if(empty($store_ids)) return [];
        $result = Stores::whereIn('id', $store_ids)->select('seller_id')->get()->toArray();
        if(!empty($result)) {
            foreach($result as $key => $_result) {
                unset($result[$key]);
                $result[$key] = $_result['seller_id'];
            }
            $result = array_unique($result);
        }
        return $result;
    }

    /**=======================
     *     RelationShip
     *=======================*/
    /**
    * @author <hauvo1709@gmail.com>
    * @todo: get information about store of seller
    * @param
    * @return void
    */
    public function store() {
        return $this->hasOne(Stores::class, 'seller_id', 'id')
            ->where([
                'stores.status' => 1,
                'stores.deleted' => 0
            ]);
    }
}
