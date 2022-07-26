<?php

namespace Frontend\Customer\Repositories\Eloquents;

use Frontend\Core\Repositories\Eloquents\BaseRepository;
use Frontend\Customer\Interfaces\CustomerRepositoryInterface;
use Frontend\Customer\Models\Customer;
use Frontend\Users\Models\Users;
use Illuminate\Support\Facades\Config;

class CustomerRepository extends BaseRepository implements CustomerRepositoryInterface {

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
    public function __construct(Customer $model) {
        $this->model = $model;
        $this->originalModel = $model;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param int $user_id
     * @return Illuminate\Support\Collection
     */
    public function get_by_user_id($user_id) {
        try {
            $result = $this->model->where('user_id', $user_id)->with([
                'user'
            ])->first();
            return $result;
        } catch (\Exception $exception) {
            return null;
        }
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $data
     * @return Illuminate\Support\Collection
     */
    public function update_account($data) {
       try {
            $user_id = isset($data['user_id']) ? $data['user_id'] : 0;
            $data_updated = [
                'fullname' => isset($data['fullname']) ? $data['fullname'] : '',
                'phone' => isset($data['phone']) ? $data['phone'] : '',
                'gender' => isset($data['gender']) ? trim($data['gender']) : 'unisex',
                'date_of_birth' => isset($data['date_of_birth']) ? trim($data['date_of_birth']) : date('Y-m-d'),
                'nickname' => isset($data['nickname']) ? trim($data['nickname']) : '',
            ];
            $affected = $this->model->where([
                'user_id' => $user_id,
                'status' => 1,
                'deleted' => 0
            ])->update($data_updated);
            $data_updated = [
                'email' => isset($data['email']) ? trim($data['email']) : '',
                'name' => isset($data['fullname']) ? trim($data['fullname']) : '',
            ];
            $affected = Users::where([
                'id' => $user_id,
                'status' => 1,
                'deleted' => 0,
            ])->update($data_updated);
            return true;
       } catch (\Exception $exception) {
            return $exception->getMessage();
       }
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param array $input
     * @return Illuminate\Support\Collection
     */
    public function store($input = []) {
        try {
            $this->model->user_id = $input['user_id'] ?? 0;
            $this->model->fullname = $input['fullname'] ?? '';
            $this->model->nickname = $input['fullname'] ?? '';
            $this->model->phone = $input['phone'] ?? '';
            $this->model->gender = $input['gender'] ?? 'unisex';
            $this->model->date_of_birth = $input['date_of_birth'] ?? date('Y-m-d H:i:s');
            $this->model->status = $input['status'] ?? 1;
            $this->model->user_created_id = $input['user_id'] ?? 0;
            $this->model->user_updated_id = $input['user_id'] ?? 0;
            $this->model->user_owner_id = $input['user_id'] ?? 0;
            $this->model->created_at = $input['created_at'] ?? date('Y-m-d H:i:s');
            $this->model->updated_at = $input['updated_at'] ?? date('Y-m-d H:i:s');
            if($this->model->save()) {
                return $this->model;
            }
            return false;
        }
        catch (Exception $errors) {
            return $errors->getMessage();
        }
    }
}
