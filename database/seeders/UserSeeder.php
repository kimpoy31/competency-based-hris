<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['username' => 'admin'], // unique key to check
            [
                'username'     => 'admin',
                'password' => Hash::make('teamhrmo2019'),
            ]
        );

        $adminRole = Role::where('name','super_admin')->first();

        if ($adminRole) {
            $user->roles()->syncWithoutDetaching([$adminRole->id]);
        }
    }
}
