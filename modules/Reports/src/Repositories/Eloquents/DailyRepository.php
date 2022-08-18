<?php

namespace Modules\Reports\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Reports\Interfaces\DailyRepositoryInterface;
use Modules\Core\Models\ModelBase;

class DailyRepository extends BaseRepository implements DailyRepositoryInterface {

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
