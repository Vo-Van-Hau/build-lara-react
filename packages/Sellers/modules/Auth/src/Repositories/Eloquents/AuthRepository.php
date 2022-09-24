<?php

namespace Sellers\Auth\Repositories\Eloquents;

use Sellers\Core\Repositories\Eloquents\BaseRepository;
use Sellers\Auth\Interfaces\AuthRepositoryInterface;
use Sellers\Core\Models\ModelBase;

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
