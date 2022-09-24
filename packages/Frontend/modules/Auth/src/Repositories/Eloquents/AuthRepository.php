<?php

namespace Frontend\Auth\Repositories\Eloquents;

use Frontend\Core\Repositories\Eloquents\BaseRepository;
use Frontend\Auth\Interfaces\AuthRepositoryInterface;
use Frontend\Core\Models\ModelBase;

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
