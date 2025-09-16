<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProficiencyLevel extends Model
{    
    protected $fillable = [
        'name',
        'level',
    ];

    public function behavioralIndicators(): HasMany
    {
        return $this->hasMany(BehavioralIndicator::class);
    }
}
