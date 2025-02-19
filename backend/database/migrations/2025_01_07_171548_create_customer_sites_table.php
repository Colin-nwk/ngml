<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customer_sites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('created_by_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('location_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string("site_address");
            $table->string("site_name");
            $table->string("phone_number");
            $table->string("email");
            $table->string("site_contact_person_name");
            $table->string("site_contact_person_email");
            $table->string("site_contact_person_phone_number");
            $table->string("site_contact_person_signature")->nullable();
            $table->boolean("site_existing_status")->default(false);
            $table->string('rate')->nullable()->comment("this holds the value agreed between both parties");
            $table->boolean("status")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_sites');
    }
};
