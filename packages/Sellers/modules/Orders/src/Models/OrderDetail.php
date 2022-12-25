<?php

namespace Sellers\Orders\Models;

use Sellers\Core\Models\ModelBase;
use Sellers\Orders\Models\Orders;
use Sellers\Products\Models\Products;

class OrderDetail extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'order_detail';

    protected $fillable = [];

    /**=======================
     *     RelationShip
     *=======================*/

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return Illuminate\Support\Collection
     */
    public function order() {
        return $this->belongsTo(Orders::class, 'order_id', 'id')
        ->where([
            'orders.deleted' => 0
        ]);
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return Illuminate\Support\Collection
     */
    public function product() {
        return $this->belongsTo(Products::class, 'product_id', 'id')
        ->where([
            'products.deleted' => 0,
            'products.status' => 1
        ]);
    }
}
