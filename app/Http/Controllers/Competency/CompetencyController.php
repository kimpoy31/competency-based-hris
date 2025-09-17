<?php

namespace App\Http\Controllers\Competency;

use App\Http\Controllers\Controller;
use App\Models\Competency;
use App\Models\CompetencyType;
use App\Models\JobFamily;
use App\Models\ProficiencyLevel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CompetencyController extends Controller
{
    public function create($jobFamilyId){
        return Inertia::render('Competency/CompetencyForm',[
            'jobFamily' => JobFamily::with('competencyType')->with('competencies.behavioralIndicators')->find($jobFamilyId),
            'proficiencyLevels' => ProficiencyLevel::all()
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'job_family_id' => ['required', 'exists:job_families,id'],
            'name' => ['required', 'string'],
            'definition' => ['required', 'string'],
        ]);

        $user = Auth::user();
        $roleName = optional($user)->getPrimaryRole();

        Competency::create([
            'user_id' => $user->id,
            'job_family_id' => $validated['job_family_id'],
            'name' => $validated['name'],
            'definition' => $validated['definition'],
            'source' => $roleName,
        ]);
    }
}
