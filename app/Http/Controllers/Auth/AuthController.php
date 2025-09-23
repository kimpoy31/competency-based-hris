<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\Spms\SpmsUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function create(){
        return Inertia::render('Auth/Login');
    }

   public function store(Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        // 1️⃣ Try authenticating existing User
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended(route('dashboard'));
        }

        // 2️⃣ If not found, try SpmsUser
        $spmsUser = SpmsUser::with('spmsEmployee')->where('username', $credentials['username'])->first();

        if ($spmsUser && Hash::check($credentials['password'], $spmsUser->password)) {
            // 3️⃣ Check if a User record already exists in your app DB
            $user = User::firstOrCreate(
                ['username' => $spmsUser->username],
                [
                    'password'   => $spmsUser->password, // already hashed in SPMS
                    'created_by' => null,
                ]
            );

            // 4️⃣ Create PersonalDataSheet if not exists
            if (!$user->personalDataSheet) {
                $employee = $spmsUser->spmsEmployee;

                $user->personalDataSheet()->create([
                    'firstname'  => $employee?->firstName ?? '',
                    'middlename' => $employee?->middleName ?? '',
                    'lastname'   => $employee?->lastName ?? '',
                ]);
            }

            // 5️⃣ Attach default role (office_admin for now)
            $role = Role::where('name', 'office_admin')->first();

            if ($role && !$user->roles()->where('role_id', $role->id)->exists()) {
                $user->roles()->attach($role->id);
            }

            // 6️⃣ Log in the newly created User
            Auth::login($user);
            $request->session()->regenerate();

            return redirect()->intended(route('dashboard'));
        }

        // 7️⃣ Both checks failed → return error
        return back()->withErrors([
            'username' => 'The provided credentials do not match any records.',
        ])->onlyInput('username');
    }


}
