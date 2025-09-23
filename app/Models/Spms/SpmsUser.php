<?php

namespace App\Models\Spms;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SpmsUser extends Authenticatable
{
    protected $connection = 'ihris';
    protected $table = 'spms_accounts';
    protected $primaryKey = 'acc_id';
    // public $timestamps = false;

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function spmsEmployee(): BelongsTo
    {
        return $this->belongsTo(
            SpmsEmployee::class,
            'employees_id', // foreign key on spms_accounts
            'employees_id'  // local key on employees table
        );
    }
}
