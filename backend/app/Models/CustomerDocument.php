<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerDocument extends Model
{
    public static $types = ['eoi'=>'EOI', 'ddq'=>'DDQ', 'site-visit-report'=>'SITE_VISIT_REPORT', 'agreement'=>'AGREEMENT',];

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
        'document_date' => 'date',
        'approval_status' => 'boolean',
        'status' => 'boolean',
    ];
}
