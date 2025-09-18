<?php

namespace App\Http\Controllers\BehavioralIndicator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BehavioralIndicator;

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
}
