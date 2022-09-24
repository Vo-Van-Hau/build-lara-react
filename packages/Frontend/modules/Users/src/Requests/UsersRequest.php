<?php

namespace Frontend\Users\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @author <hauvo1709@gmail.com>
 * @package Request
 * @copyright 2022 http://www.cayluaviet.online/
 * @license License 1.0
 * @version Release: 1.00.000
 * @link http://www.docs.v1.cayluaviet.online/
 * @since 2022-09-24
 */
class UsersRequest extends FormRequest {

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            "name"      => "required",
            "username"  => "required",
            "email"     => "required",
            "password"  => "required",
            "role"      => "required",
            "type"      => "required"
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages() {
        return [
            "name.required" => "required!",
            "username.required" => "required!",
            "email.required" => "required!",
            "password.required" => "required!",
            "role.required" => "required!",
            "type.required" => "required!"
        ];
    }
}
