<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    /** @use HasFactory<\Database\Factories\LocationFactory> */
    use HasFactory;
    public const LOCATIONS_BY_ZONE = [
        'DELTA' => ['WARRI', 'SAPELE'],
        'ABUJA' => ['ABUJA', 'OBAJANA'],
        'LAGOS' => ['LAGOS', 'SHAGAMU', 'ABEOKUTA', 'OGIJO', 'IKORODU', 'IBESE', 'IBEFUN', 'IBAFO', 'EWEKORO'],
        'EAST' => ['PORT HARCOURT', 'BENIN', 'OFUNENE', 'OKPELLA']
    ];
    public const LOCATION_TO_STATE = [
        'WARRI' => 'Delta',
        'SAPELE' => 'Delta',
        'ABUJA' => 'FCT',
        'OBAJANA' => 'Kogi',
        'LAGOS' => 'Lagos',
        'SHAGAMU' => 'Ogun',
        'ABEOKUTA' => 'Ogun',
        'OGIJO' => 'Ogun',
        'IKORODU' => 'Lagos',
        'IBESE' => 'Ogun',
        'IBEFUN' => 'Ogun',
        'IBAFO' => 'Ogun',
        'EWEKORO' => 'Ogun',
        'PORT HARCOURT' => 'Rivers',
        'BENIN' => 'Edo',
        'OFUNENE' => 'Edo',
        'OKPELLA' => 'Edo'
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

    protected $casts = [
        'status' => 'boolean',
    ];
}
