<?php

namespace Modules\Suppliers\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Suppliers\Interfaces\SuppliersRepositoryInterface;
use Modules\Core\Models\ModelBase;

class SuppliersRepository extends BaseRepository implements SuppliersRepositoryInterface {

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
