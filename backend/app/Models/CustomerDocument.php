<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    public function created_by_user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }
}
