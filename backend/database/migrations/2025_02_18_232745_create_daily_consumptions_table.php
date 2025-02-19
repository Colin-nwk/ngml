<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('daily_consumptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_site_id')->constrained()->cascadeOnDelete();
            $table->foreignId('created_by_id')->constrained('users')->cascadeOnDelete()->comment('who entered the record');
            $table->foreignId('approved_by_id')->nullable()->constrained('users')->cascadeOnDelete()->default(0)->comment('who entered the record');
            $table->float('volume')->comment('volume in mscf');
            $table->float('inlet_pressure')->nullable()->comment('inlet pressure in psi');
            $table->float('outlet_pressure')->nullable()->comment('outlet pressure in psi');
            $table->string('allocation')->nullable();
            $table->string('nomination')->nullable();
            $table->string('take_or_pay_value')->nullable();
            $table->string('daily_target')->nullable();
            $table->integer('status')->comment('volume status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_consumptions');
    }
};
