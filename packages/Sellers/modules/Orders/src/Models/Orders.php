<?php

namespace Sellers\Orders\Models;

use Sellers\Core\Models\ModelBase;
use Sellers\Orders\Models\OrderDetail;

class Orders extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'orders';

    protected $fillable = [
        'name',
        'status',
        'description',
    ];

    /**
     * @author
     * @todo
     * @param int $seller_id
     * @return
     */
    public function get_orders_by_seller_id($seller_id = 0) {
        
    }

    /**=======================
     *     RelationShip
     *=======================*/

     /**
      * @author
      * @todo:
      * @param
      * @return
      */
    public function order_detail() {
        return $this->hasMany(OrderDetail::class, 'order_id', 'id')
        ->where([
            'order_detail.deleted' => 0
        ]);
    }
}
