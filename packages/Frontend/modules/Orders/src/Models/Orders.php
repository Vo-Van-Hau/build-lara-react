<?php

namespace Frontend\Orders\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Orders\Models\OrderDetail;
use Frontend\Orders\Models\OrderTrackingStatus;
use Frontend\Customer\Models\Customer;
use Frontend\Address\Models\Countries;
use Frontend\Address\Models\Provinces;
use Frontend\Address\Models\Districts;
use Frontend\Address\Models\Wards;
use Frontend\Payments\Models\PaymentMethods;

class Orders extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'orders';

    protected $fillable = [
        'name',
        'status',
        'description'
    ];

    /**=======================
     *     RelationShip
     *=======================*/

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @return void
    */
     public function order_detail() {
        return $this->hasMany(OrderDetail::class, 'order_id', 'id')
        ->where([
            'order_detail.deleted' => 0
        ])->with([
            'product' => function($query) {
                $query->with([
                    'seller' => function($query) {
                        $query->select('id');
                    }
                ])->select(
                    'id', 'seller_id', 'name', 'slug_name', 'price', 'cogs', 'link', 'mobile_link', 'image_link',
                    'additional_image_link', 'status', 'description'
                );
            },
            'order_tracking_details' => function($query) {
                $query->
                with([
                    'order_tracking_status' => function($query) {
                        $query->select('id', 'group_status_id', 'title', 'tag_name', 'status');
                        $query->with([
                            'order_tracking_group_status' => function($query) {
                                $query->select('id', 'title', 'tag_name', 'status');
                            }
                        ]);
                    }
                ])
                ->select(
                    'id', 'code', 'order_id', 'order_detail_id', 'order_tracking_status_id', 'tracking_at', 'order_type',
                    'status'
                )->orderBy('id', 'desc');
            }
        ]);
     }

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @return void
    */
    public function customer() {
        return $this->belongsTo(Customer::class, 'user_id', 'id')
        ->where([
            'customers.status' => 1,
            'customers.deleted' => 0
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

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @return void
    */
    public function country() {
        return $this->belongsTo(Countries::class, 'receiver_country_id', 'id')
        ->where([
            'countries.status' => 1,
            'countries.deleted' => 0
        ]);
    }

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @return void
    */
    public function province() {
        return $this->belongsTo(Provinces::class, 'receiver_province_id', 'id')
        ->where([
            'provinces.status' => 1,
            'provinces.deleted' => 0
        ]);
    }

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @return void
    */
    public function district() {
        return $this->belongsTo(Districts::class, 'receiver_district_id', 'id')
        ->where([
            'districts.status' => 1,
            'districts.deleted' => 0
        ]);
    }

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @return void
    */
    public function ward() {
        return $this->belongsTo(Wards::class, 'receiver_ward_id', 'id')
        ->where([
            'wards.status' => 1,
            'wards.deleted' => 0
        ]);
    }

    /**
    * @author: <hauvo1709@gmail.com>
    * @todo:
    * @return void
    */
    public function payment_method() {
        return $this->belongsTo(PaymentMethods::class, 'payment_method_id', 'id')
        ->where([
            'payment_methods.status' => 1,
            'payment_methods.deleted' => 0
        ]);
    }
}
