<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CompetencyType extends Model
{
    protected $fillable = [
        'name',
        'user_id',
        'source',
        'status',
    ];

    public function jobFamilies(): HasMany
    {
        return $this->hasMany(JobFamily::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
