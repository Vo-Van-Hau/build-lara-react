<?php

namespace Frontend\Shop\Repositories\Eloquents;

use Frontend\Core\Repositories\Eloquents\BaseRepository;
use Frontend\Shop\Interfaces\ShopRepositoryInterface;
use Frontend\Core\Controllers\ControllerBase;
use Illuminate\Support\Facades\Config;
use Frontend\Auth\AuthFrontend;
use Frontend\Shop\Models\Stores;
use Frontend\Shop\Models\UserFollowStores;

class ShopRepository extends BaseRepository implements ShopRepositoryInterface {

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
        Stores $model
    ) {
        $this->model = $model;
        $this->originalModel = $model;
    }


    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return Illuminate\Support\Collection
     */
    public function follow_store($input) {
        $user_id = $input['user_id'] ?? 0;
        $store_id = $input['store_id'] ?? 0;
        if(!empty($user_id) && !empty($store_id)) {
            $existed = UserFollowStores::where([
                'user_id' => $user_id,
                'store_id' => $store_id,
            ])->first();
            if(empty($existed)) {
                return UserFollowStores::create([
                    'user_id' => $user_id,
                    'store_id' => $store_id,
                    'followed_at' => date('Y-m-d h:m:s'),
                    'status' => 1,
                ]);
            }
        }
        return false;
    }
}
