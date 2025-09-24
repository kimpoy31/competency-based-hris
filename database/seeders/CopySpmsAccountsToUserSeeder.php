<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Spms\SpmsUser;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CopySpmsAccountsToUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
      public function run(): void
    {
        // Fetch all SpmsUsers from ihris DB
        $spmsUsers = SpmsUser::on('ihris')->get();

        // Keep track of synced usernames
        $existingUsernames = [];

        foreach ($spmsUsers as $spmsUser) {
        // 1️⃣ Create or update User by username
            $user = User::updateOrCreate(
                ['username' => $spmsUser->username],
                [
                    'password'   => $spmsUser->password, // already hashed
                    'status'     => 1,
                    'created_by' => null,
                ]
            );

            // 2️⃣ Ensure "employee" role is attached
            $role = Role::where('name', 'employee')->first();
            if ($role && !$user->roles()->where('role_id', $role->id)->exists()) {
                $user->roles()->attach($role->id);
            }

            // 3️⃣ Sync PersonalDataSheet from SpmsEmployee
            if ($spmsUser->spmsEmployee) {
                $user->personalDataSheet()->updateOrCreate(
                    ['user_id' => $user->id], // lookup
                    [
                        'firstname'  => $spmsUser->spmsEmployee->firstName ?? '',
                        'middlename' => $spmsUser->spmsEmployee->middleName ?? '',
                        'lastname'   => $spmsUser->spmsEmployee->lastName ?? '',
                        'office_id'  => $spmsUser->spmsEmployee->department_id ?? null,
                    ]
                );
            }

            $existingUsernames[] = $spmsUser->username;
        }


        // 🔥 Delete only synced users that are missing from SpmsUsers
        // but exclude super_admin and office_admin
        User::whereNotIn('username', $existingUsernames)
            ->whereDoesntHave('roles', function ($q) {
                $q->whereIn('name', ['super_admin', 'office_admin']);
            })
            ->delete();
    }
}
