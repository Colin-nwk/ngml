<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvoiceAdviceListItem extends Model
{
    /** @use HasFactory<\Database\Factories\InvoiceAdviceListItemFactory> */
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
        'volume' => 'float',
        'inlet_pressure' => 'float',
        'outlet_pressure' => 'float',
        'status' => 'integer',
        'original_date' => 'datetime',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function customer_site(): BelongsTo
    {
        return $this->belongsTo(CustomerSite::class);
    }

    public function daily_consumption(): BelongsTo
    {
        return $this->belongsTo(DailyConsumption::class);
    }
}
