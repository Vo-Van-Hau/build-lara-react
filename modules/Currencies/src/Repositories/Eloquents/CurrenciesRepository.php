<?php

namespace Modules\Currencies\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Currencies\Interfaces\CurrenciesRepositoryInterface;
use Modules\Core\Models\ModelBase;

class CurrenciesRepository extends BaseRepository implements CurrenciesRepositoryInterface {

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
