<?php

namespace App\Models\Spms;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class SpmsEmployee extends Model
{
    protected $connection = 'ihris';
    protected $table = 'employees';
    protected $primaryKey = 'employees_id';
    public $timestamps = false;

   public function spmsUser():HasOne
   {
        return $this->hasOne(
            SpmsUser::class,
            'employees_id',      // foreign key on spms_accounts
            'employees_id'       // local key on employees table
        );
   }
}
