<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class BehavioralIndicator extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'user_id',
        'proficiency_level_id',
        'competency_id',
        'definition',
        'order',
        'source',
    ];

    public function competency(): BelongsTo
    {
        return $this->belongsTo(Competency::class);
    }

    public function proficiencyLevel(): BelongsTo
    {
        return $this->belongsTo(ProficiencyLevel::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
