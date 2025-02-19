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
        Schema::create('invoice_advice', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_site_id')->constrained()->cascadeOnDelete();
            $table->foreignId('created_by_id')->nullable()->constrained('users')->cascadeOnDelete();

            // TODO : add approval levels, approved by ids
            $table->foreignId('approval_level_id')->nullable()->constrained()->cascadeOnDelete();
            // $table->foreignId('level_1_approved_by_id')->nullable()->constrained('users')->cascadeOnDelete();
            // $table->foreignId('level_2_approved_by_id')->nullable()->constrained('users')->cascadeOnDelete();
            // $table->foreignId('level_3_approved_by_id')->nullable()->constrained('users')->cascadeOnDelete();
            //

            $table->boolean('with_vat')->nullable();
            $table->string('capex_recovery_amount')->nullable();
            $table->dateTime('invoice_advice_date');
            $table->integer('status')->default(0);
            $table->date('from_date')->nullable();
            $table->date('to_date')->nullable();
            $table->float('total_quantity_of_gas')->nullable()->comment('Total quantity of gas consumed in Scf');
            $table->string('department');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_advice');
    }
};
