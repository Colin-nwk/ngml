<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceAdvice extends Model
{
    /** @use HasFactory<\Database\Factories\InvoiceAdviceFactory> */
    use HasFactory;

    /**
     * The attributes that are mass not assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'with_vat' => 'boolean',
        'invoice_advice_date' => 'date',
        'status' => 'integer',
        'from_date' => 'date',
        'to_date' => 'date',
        'total_quantity_of_gas' => 'float',
    ];
}
