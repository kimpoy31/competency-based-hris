<?php

namespace Database\Seeders;

use App\Models\Office;
use App\Models\Spms\SpmsDepartment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OfficeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $spmsDepartments = SpmsDepartment::all();

        // Track synced IDs
        $syncedIds = [];

        foreach ($spmsDepartments as $dept) {
            $office = Office::updateOrCreate(
                ['id' => $dept->department_id], // force office.id = department_id
                [
                    'name'  => $dept->department,
                    'alias' => $dept->alias ?? '',
                ]
            );

            $syncedIds[] = $dept->department_id;
        }

        // 🔥 Delete offices not in SPMS (keeps tables in sync)
        Office::whereNotIn('id', $syncedIds)->delete();
    }
}
