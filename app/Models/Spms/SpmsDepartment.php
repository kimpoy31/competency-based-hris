<?php

namespace App\Models\Spms;

use Illuminate\Database\Eloquent\Model;

class SpmsDepartment extends Model
{
    protected $connection = 'ihris';
    protected $table = 'department';
    protected $primaryKey = 'department_id';
    public $timestamps = false;

//    public function spmsUser():HasOne
//    {
//         return $this->hasOne(
//             SpmsUser::class,
//             'employees_id',      // foreign key on spms_accounts
//             'employees_id'       // local key on employees table
//         );
//    }
}
