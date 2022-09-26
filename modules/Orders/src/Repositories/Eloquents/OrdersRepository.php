<?php

namespace Modules\Orders\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Orders\Interfaces\OrdersRepositoryInterface;
use Modules\Core\Models\ModelBase;

class OrdersRepository extends BaseRepository implements OrdersRepositoryInterface {

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
