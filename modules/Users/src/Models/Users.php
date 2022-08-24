<?php

namespace Modules\Users\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Modules\Users\Models\Traits\ACL;
use Modules\Core\Models\Traits\BasicModel;
use Modules\Users\Models\Roles;
use Modules\Users\Models\Groups;

/**
 * @author <hauvo1709@gmail.com>
 * @package Model
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-08-21
 */
class Users extends Authenticatable {

    use HasApiTokens, HasFactory, Notifiable, ACL, BasicModel;

    protected $connection = "mysql";
    protected $table = "users";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "name",
        "email",
        "password",
        "user_created_id",
        "avatar",
        "username",
        "status"
    ];

    protected $dates = [
        "updated_at",
        "created_at",
        "deleted_at",
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        "password",
        "remember_token",
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        "email_verified_at" => "datetime",
    ];

    /**=======================
     *     RelationShip
     *=======================*/

    /**
     * @author <hauvo1709@gmail.com>
     * @todo: relationship
     * @return void
     */
    public function roles() {
        return $this->belongsTo(Roles::class, "role_id", "id")->with("acl_role");
    }

    /**
     * @author <hauvo1709@gmail.com>
     * @todo: relationship
     * @return void
     */
    public function groups(){
        return $this->belongsToMany(Groups::class, "user_group", "user_id", "group_id")->wherePivot("deleted", "=", 0);
    }
}
