<?php

namespace Modules\Users\Models;

use Modules\Core\Models\ModelBase;

/**
 * @author <hauvo1709@gmail.com>
 * @package Model
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-08-22
 */
class Acl_role extends ModelBase {

    protected $connection = "mysql";

    protected $table = "acl_role";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    static function rules(){return[];}
}
