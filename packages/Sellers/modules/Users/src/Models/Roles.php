<?php

namespace Sellers\Users\Models;

use Sellers\Core\Models\ModelBase;
use Sellers\Users\Models\Users;
use Sellers\Users\Models\Acl_role;
/**
 * @author <hauvo1709@gmail.com>
 * @package Model
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-24
 */
class Roles extends ModelBase {

    protected $connection = "mysql";
    protected $table = "roles";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    public static function rules(){return [];}

    /**=======================
     *     RelationShip
     *=======================*/

    /**
     * @author <hauvo1709@gmail.com>
     * @todo: relationShip
     * @return void
     */
    public function acl_role(){
        return $this->hasMany(Acl_role::class, "role_id", "id");
    }

    /**
     * @author <hauvo1709@gmail.com>
     * @todo: relationShip
     * @return void
     */
    public static function role_options(){
        return self::select(["id as value", "name as label"])->where(["deleted" => 0, "status" => 1])->get();
    }

    /**
     * @author <hauvo1709@gmail.com>
     * @todo: relationShip
     * @return void
     */
    public function users(){
        return $this->hasMany(Users::class, "role_id", "id")->where("deleted", "=", 0);
    }
}
