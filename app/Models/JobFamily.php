<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobFamily extends Model
{
    protected $fillable = [
        'competency_type_id',
        'name',
        'status'
    ];

    public function competencyType () : BelongsTo {
        return $this->belongsTo(CompetencyType::class);
    }

    public function competencies(): HasMany
    {
        return $this->hasMany(Competency::class);
    }
}
