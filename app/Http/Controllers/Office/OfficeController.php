<?php

namespace App\Http\Controllers\Office;

use App\Http\Controllers\Controller;
use App\Models\Office;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class OfficeController extends Controller
{
      public function store(Request $request)
    {
        $user = Auth::user();

        // ✅ Block if user is not super_admin
        if (!$user->roles->contains('name', 'super_admin')) {
            return back()->with('error', 'You are not authorized to create an office.');
        }   

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
        $user = Auth::user();

        // ✅ Block if user is not super_admin
        if (!$user->roles->contains('name', 'super_admin')) {
            return back()->with('error', 'You are not authorized to edit an office.');
        }   

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
        $user = Auth::user();

        // ✅ Block if user is not super_admin
        if (!$user->roles->contains('name', 'super_admin')) {
            return back()->with('error', 'You are not authorized to delete an office.');
        }   

        $office->delete();

        return back()->with('success', 'Office deleted successfully.');
    }
}
