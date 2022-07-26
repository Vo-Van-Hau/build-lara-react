<?php

namespace Frontend\Core\Models;

use Illuminate\Database\Eloquent\Model;
use Frontend\Core\Models\Traits\BasicModel;
use Illuminate\Database\Eloquent\SoftDeletes;
use Frontend\Auth\AuthFrontend;
use Exception;

/**
 * @author <hauvo1709@gmail.com>
 * @package Model
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-21
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
        if(empty($this->user_created_id)) {
            try {
                $this->user_created_id = AuthFrontend::info("id");
            } catch (Exception $errors) {
                $this->user_created_id = 0;
            }
        }
        if(empty($this->user_owner_id)) {
            try {
                $this->user_owner_id = AuthFrontend::info("id");
            } catch (Exception $errors) {
                $this->user_owner_id = 0;
            }
        }
        $this->created_at = date("Y-m-d H:i:s");
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
        $this->deleted = 1;
        $status = parent::delete();
        return $status;
    }
}
