<?php

namespace Database\Seeders;

use App\Models\CompetencyType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompetencyTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = ['core', 'leadership', 'technical'];

        foreach ($types as $type) {
            CompetencyType::firstOrCreate(
                ['name' => $type], // check if type exists
                ['name' => $type]  // insert if not exists
            );
        }
    }
}
