<?php

namespace Database\Seeders;

use App\Models\ProficiencyLevel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProficiencyLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $levels = ['basic', 'intermediate', 'advanced', 'superior'];

        foreach ($levels as $index => $level) {
            ProficiencyLevel::firstOrCreate(
                ['name' => $level],
                [
                    'name' => $level,
                    'level' => $index + 1,
                ]
            );
        }
    }
}
