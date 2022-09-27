<?php

namespace Modules\Warehouses\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Warehouses\Interfaces\WarehousesRepositoryInterface;
use Modules\Core\Models\ModelBase;

class WarehousesRepository extends BaseRepository implements WarehousesRepositoryInterface {

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
