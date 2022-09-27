<?php

namespace Modules\Shipping\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Shipping\Interfaces\ShippingRepositoryInterface;
use Modules\Core\Models\ModelBase;

class ShippingRepository extends BaseRepository implements ShippingRepositoryInterface {

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
