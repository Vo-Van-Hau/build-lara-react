<?php

namespace Modules\Users\Models;

use Modules\Core\Models\ModelBase;
use Modules\Users\Models\Users;

class Groups extends ModelBase {

    protected $connection = "mysql";
    protected $table = "groups";

    protected $fillable = [
        "name",
        "status",
        "parent_group_id",
        "description"
    ];

    static function rules(){
        return [];
    }

    public function parent_group(){
        return $this->belongsTo("\Modules\Users\Models\Groups", "parent_group_id",);
    }

    public function users(){
        return $this->belongsToMany(Users::class, "user_group", "group_id", "user_id")->wherePivot("deleted", "=", 0);
    }
}
