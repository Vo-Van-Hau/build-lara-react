<?php

namespace Modules\Core\Interfaces;

/**
 * @author <hauvo1709@gmail.com>
 * @package Interface
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-07-21
 */
interface BaseRepositoryInterface {

    public function index();

    public function store($data = []);

    public function update($id, $data = []);

    public function delete($id);

    public function show($id);

    public function getModel($module_name = null, $model_name = null);
}
