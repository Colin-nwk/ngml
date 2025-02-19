<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApprovalLevel extends Model
{
    public const APPROVAL_LEVELS = ['level1', 'level2', 'level3', 'level4', 'level5'];
    /** @use HasFactory<\Database\Factories\ApprovalLevelFactory> */
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
}
