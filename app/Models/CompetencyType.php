<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class CompetencyType extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'user_id',
        'source',
    ];

    protected $dates = [
        'deleted_at', // optional, for clarity
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
