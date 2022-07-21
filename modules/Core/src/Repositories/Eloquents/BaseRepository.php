<?php

namespace Modules\Core\Repositories\Eloquents;

use Modules\Core\Interfaces\BaseRepositoryInterface;
use Modules\Core\Models\ModelBase;

class BaseRepository implements BaseRepositoryInterface {

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
    public function __construct(ModelBase $model) {

        $this->model = $model;
        $this->originalModel = $model;
    }

    public function index() {

        return $this->model->paginate();
    }

    public function store($data = []) {

        return $this->model->create($data);
    }

    public function update($id, $data = []) {

        $record = $this->model->findOrFail($id);

        return $record->update($data);
    }

    public function delete($id) {

        return $this->model->destroy($id);
    }

    public function show($id) {

        return $this->model->findOrFail($id);
    }

    /**
     * {@inheritdoc}
     */
    public function all(array $with = []) {

        $result = $this->model->all();

        return $result;
    }

    /**
     * {@inheritdoc}
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return void
     */
    public function setModel($model) {

        $this->model = $model;

        return $this;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param string $module_name
     * @param string $model_name
     * @return
     */
    public function getModel($module_name = null, $model_name = null){

        if ($model_name) {

            $model_focus = $model_name;
        }

        if ($module_name) {

            $module_focus = $module_name;
        }

        if ($model_focus) {

            $model_path = "\\Modules\\" . ucfirst($module_focus) . "\\Models\\" . ucfirst($model_focus);

            $model = new $model_path();

            return $model;
        }
        else {

            return null;
        }
    }

    /**
     * {@inheritdoc}
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return void
     */
    public function resetModel(){

        $this->model = new $this->originalModel;

        return $this;
    }

    /**
     * {@inheritdoc}
     * @author <vanhau.vo@urekamedia.vn>
     * @todo:
     * @return string
     */
    public function getTable() {

        return $this->model->getTable();
    }
}
