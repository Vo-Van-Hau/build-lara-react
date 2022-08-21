<?php

namespace Modules\Users\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Users\Interfaces\UsersRepositoryInterface;
use Modules\Core\Models\ModelBase;

class UsersRepository extends BaseRepository implements UsersRepositoryInterface {

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
