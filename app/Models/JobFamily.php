<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
}
