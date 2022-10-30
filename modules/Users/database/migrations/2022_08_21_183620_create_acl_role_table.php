<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAclRoleTable extends Migration {

    protected $connection = "mysql";

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create("acl_role", function (Blueprint $table) {
            $table->increments("id");
            $table->integer("role_id");
            $table->string('package_name')->nullable();
            $table->string("module_name");
            $table->string("component_name");
            $table->integer("edit")->default(0)->nullable(true);
            $table->integer("list")->default(0)->nullable(true);
            $table->integer("view")->default(0)->nullable(true);
            $table->integer("save")->default(0)->nullable(true);
            $table->integer("delete")->default(0)->nullable(true);
            $table->text("extend_permission")->nullable();
            $table->unique(array("role_id", "module_name", "component_name"), "role_id_module_name_component_name_unique");
            $table->integer("user_created_id");
            $table->integer("user_updated_id")->nullable();
            $table->integer("user_owner_id")->nullable();
            $table->dateTime("created_at")->nullable();
            $table->dateTime("updated_at")->nullable();
            $table->integer("deleted")->default(0);
            $table->dateTime("deleted_at")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists("acl_role");
    }
}
