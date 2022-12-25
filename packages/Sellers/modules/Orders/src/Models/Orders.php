<?php

namespace Sellers\Orders\Models;

use Sellers\Core\Models\ModelBase;
use Sellers\Orders\Models\OrderDetail;
use Sellers\Orders\Models\OrderTrackingStatus;

class Orders extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'orders';

    protected $fillable = [];

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

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @return void
    */
    public function order_tracking_status() {
        return $this->belongsTo(OrderTrackingStatus::class, 'order_tracking_status_id', 'id')
        ->where([
            'order_tracking_status.status' => 1,
            'order_tracking_status.deleted' => 0
        ]);
    }
}
