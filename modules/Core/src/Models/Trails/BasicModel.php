<?php

namespace Modules\Core\Models\Trails;

trait BasicModel {

    public function get_list_view($search = [])
    {
        $fields = ['id'];
        $relate = [];
        $list_view_fields = $this->list_view['fields'];
        foreach ($list_view_fields as $field => $field_props) {
            if ($field_props['type'] === "relate") {
                $relate[$field] = $field_props;
            }
            $fields[] = $field;
        }
        $result = self::select($fields)
            ->where([
                'deleted' => 0,
                // 'status' => 1
            ]);
        $main_search = [];
        $relate_search = [];
        foreach ($search as $value) {
            if (!isset($list_view_fields[$value[0]])) {
                $main_search[] = $value;
            } else {
                if ($list_view_fields[$value[0]]['type'] == "relate") {
                    $tmp = $value[0];
                    $value[0] = $list_view_fields[$value[0]]['search']['search_field'];
                    $relate_search[$list_view_fields[$tmp]['relate']] = $value;
                } else {
                    $main_search[] = $value;
                }
            }
        }
        if (!empty($main_search)) {
            $result->where($main_search);
        }
        foreach ($relate as $field => $field_props) {
            // $field_props['relate'] . ":id," . $field_props['relate_field']
            $result->with([$field_props['relate'] => function ($query) use ($field_props) {
                $query->select(['id', $field_props['relate_field']]);
            }]);
        }
        foreach ($relate_search as $relation_name => $condition) {
            $result->whereHas($relation_name, function ($query) use ($condition) {
                $query->where([$condition]);
            });
        }
        return $result->orderBy('created_at', 'DESC')->ACL()->paginate(config("backend_config.item_per_page"));
    }
}
