<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Office;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        $authUser = Auth::user();

        // If not super admin, prevent assigning/removing office_admin
        if (!$authUser->roles->contains('name', 'super_admin')) {
            $officeAdminId = Role::where('name', 'office_admin')->value('id');

            // Always keep office_admin if the user already has it
            if ($user->roles->contains('id', $officeAdminId)) {
                $validated['roles'][] = $officeAdminId;
            }

            // Also make sure office_admin isn't added if it wasn't there
            $validated['roles'] = collect($validated['roles'])
                ->unique()
                ->reject(fn ($roleId) => $roleId == $officeAdminId && !$user->roles->contains('id', $officeAdminId))
                ->values()
                ->toArray();
        }

        // Sync roles
        $user->roles()->sync($validated['roles']);
    }


}
