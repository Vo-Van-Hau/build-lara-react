<?php

namespace Modules\Carts\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Carts\Interfaces\CartsRepositoryInterface;
use Modules\Core\Models\ModelBase;

class CartsRepository extends BaseRepository implements CartsRepositoryInterface {

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
