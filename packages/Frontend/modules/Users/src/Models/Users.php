<?php

namespace Frontend\Users\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Frontend\Users\Models\Traits\ACL;
use Frontend\Core\Models\Traits\BasicModel;
use Frontend\Users\Models\Roles;
use Frontend\Users\Models\Groups;
use Frontend\Publishers\Models\Publishers;
use Frontend\Customer\Models\Customer;
use Frontend\Shop\Models\UserFollowStores;

/**
 * @author <hauvo1709@gmail.com>
 * @package Model
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-24
 */
class Users extends Authenticatable {

    use HasApiTokens, HasFactory, Notifiable, ACL, BasicModel;

    protected $connection = 'mysql';
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'user_created_id',
        'avatar',
        'username',
        'status'
    ];

    protected $dates = [
        'updated_at',
        'created_at',
        'deleted_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
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
        return $this->belongsTo(Roles::class, 'role_id', 'id')->with('acl_role');
    }

    /**
     * @author <hauvo1709@gmail.com>
     * @todo: relationship
     * @return void
     */
    public function groups() {
        return $this->belongsToMany(Groups::class, 'user_group', 'user_id', 'group_id')->wherePivot('deleted', '=', 0);
    }

    /**
     * @author <hauvo1709@gmail.com>
     * @todo: relationship
     * @return void
     */
    public function publishers() {
        return $this->belongsToMany(Publishers::class, 'user_publisher', 'user_id', 'publisher_id')->wherePivot('deleted', '=', 0);
    }

    /**
     * @author <hauvo1709@gmail.com>
     * @todo: relationship
     * @return void
     */
    public function customer() {
        return $this->hasOne(Customer::class, 'user_id', 'id')->where([
            'customers.status' => 1,
            'customers.deleted' => 0
        ])->with([
            'customer_address' => function ($query) {
                $query->select(
                    'id', 'customer_id', 'customer_name', 'area_id', 'country_id', 'province_id', 'district_id', 'ward_id',
                    'address', 'is_verified', 'is_default', 'delivery_address_type', 'status', 'phone', 'company_name'
                );
            }
        ]);
    }

    /**
     * @author <hauvo1709@gmail.com>
     * @todo: relationship
     * @return void
     */
    public function user_follow_stores() {
        return $this->hasMany(UserFollowStores::class, 'user_id', 'id')->where([
            'user_follow_stores.status' => 1,
            'user_follow_stores.deleted' => 0,
        ]);
    }
}
