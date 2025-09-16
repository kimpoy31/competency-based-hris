<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobFamily extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'user_id',
        'competency_type_id',
        'name',
        'source',
    ];

    public function competencyType () : BelongsTo {
        return $this->belongsTo(CompetencyType::class);
    }

    public function competencies(): HasMany
    {
        return $this->hasMany(Competency::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
