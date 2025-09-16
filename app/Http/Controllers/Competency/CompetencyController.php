<?php

namespace App\Http\Controllers\Competency;

use App\Http\Controllers\Controller;
use App\Models\Competency;
use App\Models\CompetencyType;
use App\Models\JobFamily;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompetencyController extends Controller
{
    public function create($jobFamilyId){
        return Inertia::render('Competency/CompetencyForm',[
            'jobFamily' => JobFamily::with('competencyType')->with('competencies')->find($jobFamilyId),
        ]);
    }
}
