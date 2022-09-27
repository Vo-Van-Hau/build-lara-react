<?php

namespace Modules\Address\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Address\Interfaces\AddressRepositoryInterface;
use Modules\Core\Models\ModelBase;

class AddressRepository extends BaseRepository implements AddressRepositoryInterface {

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
