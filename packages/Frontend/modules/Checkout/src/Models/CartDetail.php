<?php

namespace Frontend\Checkout\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Checkout\Models\Carts;
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
class CartDetail extends ModelBase {

    protected $connection = "mysql";
    protected $table = "cart_detail";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

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
     * @author <hauvo1709@gmail.com>
     * @todo
     * @return void
     */
    public function product() {
        return $this->belongsTo(Products::class, "product_id", "id")
        ->where([
            "products.status" => 1,
            "products.deleted" => 0
        ]);
    }
}
