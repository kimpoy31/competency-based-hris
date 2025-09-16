<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Competency extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'user_id',
        'job_family_id',
        'name',
        'definition',
        'source',
    ];

    public function jobFamily(): BelongsTo
    {
        return $this->belongsTo(JobFamily::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function behavioralIndicators(): HasMany
    {
        return $this->hasMany(BehavioralIndicator::class);
    }
}
