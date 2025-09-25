<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PersonalDataSheet extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'user_id',
        'office_id',
        'firstname',
        'middlename',
        'lastname',
    ];

    // Make fullname available in array/JSON outputs
    protected $appends = ['fullname'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function office(): BelongsTo
    {
        return $this->belongsTo(Office::class);
    }

    // Accessor for full name
    public function getFullnameAttribute(): string
    {
        $parts = [
            $this->firstname,
            $this->middlename,
            $this->lastname,
        ];

        // Remove empty parts and join with space
        return implode(' ', array_filter($parts));
    }
}
