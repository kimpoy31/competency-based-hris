<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function create () {
        return Inertia::render('Admin/AccountForm',[
            'roles' => Role::where('name', '!=', 'super_admin')->get()
        ]);
    }
}
