<?php

namespace Frontend\Address\Models;

use Frontend\Core\Models\ModelBase;
use Frontend\Address\Models\Areas;
use Frontend\Address\Models\Countries;
use Frontend\Address\Models\Provinces;
use Frontend\Address\Models\Districts;
use Frontend\Address\Models\Wards;

class CustomerAddress extends ModelBase {

    protected $connection = "mysql";
    protected $table = "customer_address";

    protected $fillable = ['id'];

    /**=======================
     *     RelationShip
     *=======================*/
    /**
     * @author: <hauvo1709@gmail.com>
     * @todo:
     * @param
     * @return
     */
     public function area() {
        return $this->belongsTo(Areas::class, "area_id", "id")
        ->where([
            "areas.status" => 1,
            "areas.deleted" => 0
        ]);
     }

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo:
     * @param
     * @return
     */
     public function country() {
        return $this->belongsTo(Countries::class, "country_id", "id")
        ->where([
            "countries.status" => 1,
            "countries.deleted" => 0
        ]);
     }

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo:
     * @param
     * @return
     */
     public function province() {
        return $this->belongsTo(Provinces::class, "province_id", "id")
        ->where([
            "provinces.status" => 1,
            "provinces.deleted" => 0
        ]);
     }

    /**
     * @author: <hauvo1709@gmail.com>
     * @todo:
     * @param
     * @return
     */
     public function district() {
        return $this->belongsTo(Districts::class, "district_id", "id")
        ->where([
            "districts.status" => 1,
            "districts.deleted" => 0
        ]);
     }

     /**
     * @author: <hauvo1709@gmail.com>
     * @todo:
     * @param
     * @return
     */
     public function ward() {
        return $this->belongsTo(Wards::class, "ward_id", "id")
        ->where([
            "wards.status" => 1,
            "wards.deleted" => 0
        ]);
     }
}
