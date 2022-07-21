<?php

namespace Modules\Core\Interfaces;

interface BaseRepositoryInterface {

    public function index();

    public function store($data = []);

    public function update($id, $data = []);

    public function delete($id);

    public function show($id);

    public function getModel($module_name = null, $model_name = null);
}
