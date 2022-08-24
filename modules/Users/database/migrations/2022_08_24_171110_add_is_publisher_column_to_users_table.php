<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsPublisherColumnToUsersTable extends Migration {

    protected $connection = "mysql";

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::table("users", function (Blueprint $table) {
            $table->integer("is_publisher")->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::table("users", function (Blueprint $table) {
            $table->dropColumn("is_publisher");
        });
    }
}
