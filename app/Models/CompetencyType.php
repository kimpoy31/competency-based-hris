<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CompetencyType extends Model
{
    protected $fillable = [
        'name',
        'status'
    ];

    public function jobFamilies(): HasMany
    {
        return $this->hasMany(JobFamily::class);
    }
}
