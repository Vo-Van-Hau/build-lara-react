<?php

namespace Modules\Auth\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Auth\Interfaces\AuthRepositoryInterface;
use Modules\Core\Models\ModelBase;

class AuthRepository extends BaseRepository implements AuthRepositoryInterface {

    /**
     * @var Eloquent | Model
     */
    protected $model;

    /**
     * @var Eloquent | Model
     */
    protected $originalModel;

    /**
     * Repository constructor.
     * @param Model|Eloquent $model
     *
     */
    public function __construct() {}
}
