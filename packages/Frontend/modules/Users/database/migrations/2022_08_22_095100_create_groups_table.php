<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGroupsTable extends Migration {

    protected $connection = "mysql";

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create("groups", function (Blueprint $table) {
            $table->increments("id");
            $table->string("name")->nullable();
            $table->boolean("status")->default(1);
            $table->text("description")->nullable();
            $table->integer("parent_group_id")->default(0);
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
        Schema::dropIfExists("groups");
    }
}
