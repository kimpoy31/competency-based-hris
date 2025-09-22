<?php

namespace App\Http\Controllers\Office;

use App\Http\Controllers\Controller;
use App\Models\Office;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class OfficeController extends Controller
{
      public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('offices', 'name')->whereNull('deleted_at'),
            ],
        ]);

        Office::create($validated);

        return back()->with('success', 'Office created successfully.');
    }

     public function update(Request $request, Office $office)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('offices', 'name')
                    ->whereNull('deleted_at')
                    ->ignore($office->id),
            ],
        ]);

        $office->update($validated);

        return back()->with('success', 'Office updated successfully.');
    }

    public function destroy(Office $office)
    {
        $office->delete();

        return back()->with('success', 'Office deleted successfully.');
    }
}
