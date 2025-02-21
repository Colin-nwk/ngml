<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Unit extends Model
{
    /** @use HasFactory<\Database\Factories\UnitFactory> */
    use HasFactory;
    public const UNITS = [
        "N/A",
        "GRC",
        "RGDN",
        "RGDD",
        "RGDL",
        "BUSINESS DEVELOPMENT",
        "STRATEGY AND SUSTAINABILITY",
        "COMMERCIAL OPERATIONS",
        "HCM",
        "SECURITY",
        "ADMIN",
        "ICT",
        "TREASURY",
        "HSE",
        "MD's OFFICE",
        "CSLA",
        "RGDE",
        "MARKET INSIGHT AND ANALYTICS",
        "CONTRACT MANAGEMENT",
        "BUDGET AND FINANCIAL ANALYSIS",
        "FINANCIAL CONTROL AND ACCOUNTING",
        "TAX FILING AND COMPLIANCE",
        "STRATEGY AND SUSTAINABILITY",
        "RDGL"
    ];


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
}
