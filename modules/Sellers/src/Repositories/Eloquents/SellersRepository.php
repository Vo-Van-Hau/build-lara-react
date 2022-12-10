<?php

namespace Modules\Sellers\Repositories\Eloquents;

use Modules\Core\Repositories\Eloquents\BaseRepository;
use Modules\Sellers\Interfaces\SellersRepositoryInterface;
use Modules\Core\Models\ModelBase;
use Modules\Users\Models\Users;
use Modules\Sellers\Models\Sellers;
use Illuminate\Support\Facades\Config;

class SellersRepository extends BaseRepository implements SellersRepositoryInterface {

    /**
     * @var Eloquent | Model
     */
    protected $model;
    protected Users $users_model;

    /**
     * @var Eloquent | Model
     */
    protected $originalModel;

    /**
     * Repository constructor.
     * @param Model|Eloquent $model
     *
     */
    public function __construct(Sellers $model, Users $users_model) {
        $this->model = $model;
        $this->users_model = $users_model;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $keyword
     * @param array $status
     * @return Illuminate\Support\Collection
     */
    public function get_all_users($keyword = '', $status = []) {
        $result = $this->users_model->where([
            'deleted' => 0,
            'is_admin' => 0,
            'role_id' => 19,
        ]);
        if(!empty($status)){
            $result = $result->whereIn('status', $status);
        }
        if($keyword != ''){
            $result = $result->whereRaw('(username LIKE \'%'.$keyword.'%\' OR name LIKE \'%'.$keyword.'%\' OR email LIKE \'%'.$keyword.'%\')');
        }
        return $result->orderBy('created_at', 'DESC')
            ->select('id', 'name', 'username', 'email', 'role_id', 'status', 'avatar', 'is_admin', 'is_publisher')
            ->with([
                'roles:id,name',
                'groups:id,name',
                'seller' => function($query) {
                    $query->select('id', 'user_id', 'fullname', 'phone', 'date_of_birth', 'is_accepted', 'status');
                }
            ])
            ->paginate(Config::get('module.sellers.item_per_page', 10));
    }

    /**
     * @author <hauvo1709@gmail.com>
     * @todo:
     * @param array $values
     * @return Illuminate\Support\Collection
     */
    public function handle_accept_seller($values) {
        try {
            $seller_id = isset($values['seller_id']) ? $values['seller_id'] : 0;
            $is_accepted = isset($values['is_accepted']) ? $values['is_accepted'] : null;
            if(empty($seller_id) || is_null($is_accepted)) return false;
            $existed = $this->model->find($seller_id);
            if($is_accepted === 0) {
                $existed->is_accepted = 0;
            } elseif($is_accepted === 1) {
                $existed->is_accepted = 1;
            } else {
                $existed->is_accepted = $existed->is_accepted;
            }
            return $existed->save();
        } catch (\Exception $exception) {
            return false;
        }
    }
}
