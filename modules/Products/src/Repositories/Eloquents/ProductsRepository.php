<?php

namespace Modules\Products\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Products\Interfaces\ProductsRepositoryInterface;
use Modules\Core\Models\ModelBase;

class ProductsRepository extends BaseRepository implements ProductsRepositoryInterface {

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
