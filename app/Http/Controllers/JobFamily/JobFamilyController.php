<?php

namespace App\Http\Controllers\JobFamily;

use App\Http\Controllers\Controller;
use App\Models\JobFamily;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JobFamilyController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'competency_type_id' => ['required', 'exists:competency_types,id'],
            'name' => ['required', 'string']
        ]);

        $roleName = optional(Auth::user())->getPrimaryRole();

        $jobFamily = JobFamily::create([
            'user_id' => Auth::user()->id,
            'competency_type_id' => $validated['competency_type_id'],
            'name' => $validated['name'],
            'source' => $roleName ?? 'system',
        ]);

        // return back()->withErrors([
        //     'username' => 'The provided credentials do not match our records.',
        // ])->onlyInput('username');
    }
}
