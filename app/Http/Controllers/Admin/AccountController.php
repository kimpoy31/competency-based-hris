<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Office;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function update ($userId) {
        return Inertia::render('Admin/AccountForm',[
            'user' => User::with(['personalDataSheet.office', 'roles'])->find($userId),
            'roles' => Role::where('name', '!=', 'super_admin')->get(),
            'offices' => Office::all()
        ]);
    }

    public function edit(Request $request)
    {
        $validated = $request->validate([
            'user_id'   => ['required', 'exists:users,id'],
            'firstname' => ['required', 'string'],
            'middlename'=> ['nullable', 'string'],
            'lastname'  => ['required', 'string'],
            'office_id'  => ['required', 'exists:offices,id'],
            'roles'     => ['required', 'array'],
            'roles.*'   => ['required', 'exists:roles,id'],
        ]);

        $user = User::findOrFail($validated['user_id']);

        // Update the related PersonalDataSheet
        $user->personalDataSheet()->update([
            'firstname'  => $validated['firstname'],
            'middlename' => $validated['middlename'],
            'lastname'   => $validated['lastname'],
            'office_id' => $validated['office_id']
        ]);

        // Sync roles
        $user->roles()->sync($validated['roles']);

        // return response()->json(['message' => 'User updated successfully']);
    }


}
