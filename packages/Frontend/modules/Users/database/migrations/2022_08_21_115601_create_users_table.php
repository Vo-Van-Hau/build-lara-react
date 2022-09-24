<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration {

    protected $connection = "mysql";

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create("users", function (Blueprint $table) {
            $table->increments("id");
            $table->rememberToken("remember_token");
            $table->string("avatar")->nullable();
            $table->string("username")->unique();
            $table->string("email")->unique();
            $table->string("name");
            $table->boolean("status")->default(1);
            $table->string("password");
            $table->integer("is_admin")->default(0);
            $table->integer("role_id")->default(0);
            $table->string("login_ip")->nullable();
            $table->text("token")->nullable();
            $table->text("token_default")->nullable();
            $table->integer("special")->default(0);
            $table->integer("type")->default(0);
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
        Schema::dropIfExists("users");
    }
}
