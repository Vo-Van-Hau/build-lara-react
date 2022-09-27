<?php

namespace Modules\Sellers\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Sellers\Interfaces\SellersRepositoryInterface;
use Modules\Core\Models\ModelBase;

class SellersRepository extends BaseRepository implements SellersRepositoryInterface {

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
