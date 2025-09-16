<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class BehavioralIndicator extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'proficiency_level_id',
        'competency_id',
        'definition',
        'order',
    ];

    public function competency(): BelongsTo
    {
        return $this->belongsTo(Competency::class);
    }

    public function proficiencyLevel(): BelongsTo
    {
        return $this->belongsTo(ProficiencyLevel::class);
    }
}
