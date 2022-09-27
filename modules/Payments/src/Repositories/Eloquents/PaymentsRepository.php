<?php

namespace Modules\Payments\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Payments\Interfaces\PaymentsRepositoryInterface;
use Modules\Core\Models\ModelBase;

class PaymentsRepository extends BaseRepository implements PaymentsRepositoryInterface {

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
