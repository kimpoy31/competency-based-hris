<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['super_admin', 'office_admin', 'employee'];

        foreach ($roles as $role) {
            Role::firstOrCreate(
                ['name' => $role], // check if role exists
                ['name' => $role]  // insert if not exists
            );
        }
    }
}
