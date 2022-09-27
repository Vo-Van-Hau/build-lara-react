<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFeedbacksTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('feedbacks', function (Blueprint $table) {
            $table->increments("id")->unsigned();
            $table->string("name_from");
            $table->string("phone_from");
            $table->string("email_from");
            $table->longText("message");
            $table->integer("responded")->unsigned()->default(0);
            $table->datetime("responded_at");
            $table->integer("status")->unsigned()->default(0)->comment("[received, processing, solved, responded]");
            $table->longText("description")->nullable()->comment("1–5,000 characters");
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
        Schema::dropIfExists("feedbacks");
    }
}
