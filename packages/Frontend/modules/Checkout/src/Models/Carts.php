<?php

namespace Frontend\Checkout\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Checkout\Models\CartDetail;
use Frontend\Users\Models\Users;
use Frontend\Products\Models\Products;

/**
 * @author <hauvo1709@gmail.com>
 * @package Model
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-27
 */
class Carts extends ModelBase {

    protected $connection = 'mysql';
    protected $table = 'carts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [];

    /**=======================
     *     RelationShip
     *=======================*/

     /**
      * @author: <hauvo1709@gmail.com>
      * @todo:
      * @return void
      */
    public function cart_detail() {
        return $this->hasMany(CartDetail::class, 'cart_id', 'id')
        ->where([
            'cart_detail.status' => 1,
            'cart_detail.deleted' => 0
        ])->with([
            'product' => function($query) {
                $query->select('id', 'name', 'slug_name', 'price', 'link', 'mobile_link', 'image_link');
            }
        ]);
    }

    /**
      * @author: <hauvo1709@gmail.com>
      * @todo:
      * @return void
      */
    public function user() {
        return $this->belongsTo(Users::class, 'user_id', 'id')
        ->where([
            'users.status' => 1,
            'users.deleted' => 0
        ])->with([
            'customer' => function ($query) {
                $query->select('user_id', 'id', 'fullname', 'nickname', 'phone');
            }
        ]);
    }
}
