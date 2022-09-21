<?php

namespace Modules\Core\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Core\Models\Traits\BasicModel;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Auth\AuthCMS;
use Exception;

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

    use BasicModel, SoftDeletes;

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

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $options
     * @return bool
     */
    public function save(array $options = []) {
        if (empty($this->user_created_id)) {
            try {
                $this->user_created_id = AuthCMS::info("id");
            } catch (Exception $errors) {
                $this->user_created_id = 1;
            }
        }
        if (empty($this->user_owner_id)) {
            try {
                $this->user_owner_id = AuthCMS::info("id");
            } catch (Exception $errors) {
                $this->user_owner_id = 1;
            }
        }
        $status = parent::save($options);
        return $status;
    }

    public function update(array $attributes = [], array $options = []) {
        if (empty($this->user_updated_id)) {
            try {
                $this->user_updated_id = AuthCMS::info("id");
            } catch (Exception $errors) {
                $this->user_updated_id = 1;
            }
        }
        $check = parent::update($attributes, $options);
        return $check;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return bool
     */
    public function delete() {
        $status = parent::delete();
        return $status;
    }
}
