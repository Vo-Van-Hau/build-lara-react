<?php

namespace Sellers\Settings\Repositories\Eloquents;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Sellers\Core\Repositories\Eloquents\BaseRepository;
use Sellers\Settings\Interfaces\SettingsRepositoryInterface;
use Sellers\Settings\Models\Settings;

class SettingsRepository extends BaseRepository implements SettingsRepositoryInterface {

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
    public function __construct(
        Settings $model
    ) {
        $this->model = $model;
    }
}
