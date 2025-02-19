<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GasCost extends Model
{
    /** @use HasFactory<\Database\Factories\GasCostFactory> */
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
        'date_of_entry' => 'date',
        'dollar_cost_per_scf' => 'float',
        'dollar_rate' => 'float',
        'status' => 'boolean',
    ];
}
