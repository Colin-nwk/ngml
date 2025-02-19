<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function customer_site(): BelongsTo
    {
        return $this->belongsTo(CustomerSite::class);
    }

    public function created_by(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
