<?php

namespace Modules\Core\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Core\Models\Trails\BasicModel;

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
