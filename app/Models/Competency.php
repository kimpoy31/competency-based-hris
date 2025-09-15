<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Competency extends Model
{
    protected $fillable = [
        'job_family_id',
        'name',
        'status'
    ];

    public function jobFamily(): BelongsTo
    {
        return $this->belongsTo(JobFamily::class);
    }
}
