<?php

namespace Modules\Core\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Core\Models\Traits\BasicModel;

/**
 * @author <hauvo1709@gmail.com>
 * @package Model
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-07-21
 */
class ModelBase extends Model {

    protected $connection = "mysql";

    use BasicModel;

    protected $multi_language = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        "translate"
    ];

    public function __construct($attributes = array()) {

        parent::__construct($attributes);
    }

    const ACTIVE = 1;
    const DISABLE = 0;
}
