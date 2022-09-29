<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePublishersTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create("publishers", function (Blueprint $table) {
            $table->increments("id");
            $table->string("name");
            $table->string("email")->unique();
            $table->boolean("status")->default(1);
            $table->text("description")->nullable();
            $table->string("company_name");
            $table->string("represented_by");
            $table->string("office");
            $table->string("contract");
            $table->dateTime("date_of_contract");
            $table->string("code_tax");
            $table->string("address");
            $table->string("card_name");
            $table->string("card_number");
            $table->string("phone");
            $table->integer("area_id");
            $table->integer("type");
            $table->string("identity_card");
            $table->string("branch_bank");
            $table->integer("user_id");
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
        Schema::dropIfExists("publishers");
    }
}
