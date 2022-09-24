<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserPublisherTable extends Migration {
    
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create("user_publisher", function (Blueprint $table) {
            $table->increments("id");
            $table->integer("user_id");
            $table->integer("publisher_id");
            $table->unique(array("user_id", "publisher_id"), "user_id_publisher_id_unique");
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
        Schema::dropIfExists("user_publisher");
    }
}
