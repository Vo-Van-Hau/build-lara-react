<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductCategoriesTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('product_categories', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('title');
            $table->integer('parent_id')->unsigned();
            $table->integer('uncle_id')->unsigned()->default(1);
            $table->integer('friend_id')->unsigned()->default(1);
            $table->text('icon_link');
            $table->integer('status')->unsigned()->default(0);
            $table->longText('description')->nullable()->comment('1–5,000 characters');
            $table->integer('user_created_id');
            $table->integer('user_updated_id')->nullable();
            $table->integer('user_owner_id')->nullable();
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
            $table->integer('deleted')->default(0);
            $table->dateTime('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('product_categories');
    }
}
