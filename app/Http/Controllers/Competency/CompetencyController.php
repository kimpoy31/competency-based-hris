<?php

namespace App\Http\Controllers\Competency;

use App\Http\Controllers\Controller;
use App\Models\BehavioralIndicator;
use App\Models\Competency;
use App\Models\CompetencyType;
use App\Models\JobFamily;
use App\Models\ProficiencyLevel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CompetencyController extends Controller
{
    public function create($jobFamilyId){
        return Inertia::render('Competency/CompetencyForm',[
            'jobFamily' => JobFamily::with('competencyType')->with('competencies.behavioralIndicators')->find($jobFamilyId),
            'proficiencyLevels' => ProficiencyLevel::all()
        ]);
    }

    public function edit($jobFamilyId, $competencyId){
        return Inertia::render('Competency/CompetencyForm',[
            'jobFamily' => JobFamily::with('competencyType')->with('competencies.behavioralIndicators')->find($jobFamilyId),
            'proficiencyLevels' => ProficiencyLevel::all(), 
            'competencyToEdit' => Competency::with('behavioralIndicators')->find($competencyId),
        ]);
    }

    public function update (Request $request) {
        $validated = $request->validate([
            'competency_id' =>  ['required', 'integer', 'exists:competencies,id'],
            'name'          => ['required', 'string'],
            'definition'    => ['required', 'string'],
        ]);

        $competency = Competency::find($validated['competency_id']);

        $competency->update([
            'name' => $validated['name'],
            'definition' => $validated['definition'],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_family_id' => ['required', 'exists:job_families,id'],
            'name'          => ['required', 'string'],
            'definition'    => ['required', 'string'],
            
            'behavioralIndicators'   => ['array'],
            'behavioralIndicators.*.proficiency_level_id'=> ['required', 'integer', 'exists:proficiency_levels,id'],
            'behavioralIndicators.*.definition'          => ['required', 'string'],
            'behavioralIndicators.*.order'               => ['required', 'integer'],
        ]);

        $user = Auth::user();
        $roleName = optional($user)->getPrimaryRole();

        $competency = DB::transaction(function () use ($validated, $user, $roleName) {
            $competency = Competency::create([
                'user_id'       => $user->id,
                'job_family_id' => $validated['job_family_id'],
                'name'          => $validated['name'],
                'definition'    => $validated['definition'],
                'source'        => $roleName,
            ]);

            foreach ($validated['behavioralIndicators'] as $indicator) {
                BehavioralIndicator::create([
                    'user_id'             => $user->id,
                    'proficiency_level_id'=> $indicator['proficiency_level_id'],
                    'competency_id'       => $competency->id,
                    'definition'          => $indicator['definition'],
                    'order'               => $indicator['order'],
                    'source'              => $roleName,
                ]);
            }

            return $competency;
        });

        return to_route('competencies.edit', [
            'jobFamilyId'  => $competency->job_family_id,
            'competencyId' => $competency->id,
        ]);
    }

    public function delete(Request $request)
    {
        $competency = Competency::findOrFail($request->competency_id);
        $jobFamilyId = $competency->job_family_id;
        $competency->delete(); // soft delete
        
        return to_route('job-families.show',['jobFamilyId' => $jobFamilyId]);
    }


}
