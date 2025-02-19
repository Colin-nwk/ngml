<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DailyConsumption extends Model
{
    /** @use HasFactory<\Database\Factories\DailyConsumptionFactory> */
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

    public function approved_by(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
