<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
