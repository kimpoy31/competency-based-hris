<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Office extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'alias',
    ];

    public function personalDataSheets(): HasMany
    {
        return $this->hasMany(PersonalDataSheet::class);
    }

}
