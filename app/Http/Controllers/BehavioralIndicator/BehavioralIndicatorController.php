<?php

namespace App\Http\Controllers\BehavioralIndicator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BehavioralIndicator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class BehavioralIndicatorController extends Controller
{
    public function update(Request $request){
        $validated = $request->validate([
            'behavioral_indicator_id' =>  ['required', 'integer', 'exists:behavioral_indicators,id'],
            'definition'    => ['required', 'string'],
        ]);

        $indicator = BehavioralIndicator::find($validated['behavioral_indicator_id']);
        $indicator->update([
            'definition' => $validated['definition']
        ]);
    }      

    public function delete(Request $request){
        $validated = $request->validate([
            'behavioral_indicator_id' =>  ['required', 'integer', 'exists:behavioral_indicators,id'],
        ]);

        // SOFT DELETE
        $indicator = BehavioralIndicator::findOrFail($validated['behavioral_indicator_id']);
        $indicator->delete();

        // REORDER
        $indicatorsToReorder = BehavioralIndicator::where('proficiency_level_id', $indicator->proficiency_level_id)
            ->orderBy('order')
            ->get();

        foreach($indicatorsToReorder as $index => $i){
            $i->update([
                'order' => $index + 1
            ]);
        }        
    }      

    public function store(Request $request){
        $validated = $request->validate([
            'competency_id' =>  ['required', 'integer', 'exists:competencies,id'],
            'proficiency_level_id' =>  ['required', 'integer', 'exists:proficiency_levels,id'],
            'definition'    => ['required', 'string'],
        ]);

        $user = Auth::user();
        $activeIndicatorCount = BehavioralIndicator::where('competency_id',$validated['competency_id'])
            ->where('proficiency_level_id',$validated['proficiency_level_id'])
            ->count();

        BehavioralIndicator::create([
            'user_id' => $user->id,
            'proficiency_level_id' => $validated['proficiency_level_id'],
            'competency_id' => $validated['competency_id'],
            'definition' => $validated['definition'],
            'order' => $activeIndicatorCount + 1,
            'source' => optional($user)->getPrimaryRole(),
        ]);
    }      

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'proficiency_level_id' => ['required', 'integer', 'exists:proficiency_levels,id'],
            'ordered_ids' => ['required', 'array'],
            'ordered_ids.*' => ['integer', 'exists:behavioral_indicators,id'],
        ]);

        $indicators = BehavioralIndicator::where('proficiency_level_id', $validated['proficiency_level_id'])
            ->whereIn('id', $validated['ordered_ids'])
            ->get()
            ->keyBy('id');

        foreach ($validated['ordered_ids'] as $index => $id) {
            if (isset($indicators[$id])) {
                $indicators[$id]->update(['order' => $index + 1]);
            }
        }

        return back()->with('success', 'Indicators reordered successfully!');
    }


}
