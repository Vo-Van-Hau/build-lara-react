<?php

namespace Modules\Module\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Module\Interfaces\ModuleRepositoryInterface;
use Modules\Core\Models\ModelBase;

class ModuleRepository extends BaseRepository implements ModuleRepositoryInterface {

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
