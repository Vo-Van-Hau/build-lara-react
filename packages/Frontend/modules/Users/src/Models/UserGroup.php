<?php

namespace Frontend\Users\Models;

use Frontend\Core\Models\ModelBase;

/**
 * @author <hauvo1709@gmail.com>
 * @package Model
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-24
 */
class UserGroup extends ModelBase {

    protected $connection = "mysql";

    protected $table = "user_group";

    protected $fillable = [];

    static function rules(){return[];}
}
