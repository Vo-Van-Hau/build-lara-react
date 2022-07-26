<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoresTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('stores', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('name');
            $table->integer('seller_id')->unsigned();
            $table->text('brand_logo')->nullable();
            $table->integer('area_id')->unsigned()->default(0);
            $table->integer('country_id')->unsigned()->default(0);
            $table->integer('province_id')->unsigned()->default(0);
            $table->integer('district_id')->unsigned()->default(0);
            $table->integer('ward_id')->unsigned()->default(0);
            $table->text('address');
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
        if(Schema::hasTable('stores')) {
            if(!Schema::hasColumn('stores', 'joined_date')) {
                Schema::table('stores', function(Blueprint $table) {
                    $table->timestamp('joined_date');
                });
            }
            if(!Schema::hasColumn('stores', 'category_id')) {
                Schema::table('stores', function(Blueprint $table) {
                    $table->integer('category_id')->unsigned()->default(0);
                });
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('stores');
    }
}
