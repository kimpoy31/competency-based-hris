<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Office;
use App\Models\Role;
use App\Models\Spms\SpmsEmployee;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query()->whereHas('roles', function ($q) {
            $q->where('name', '!=', 'super_admin');
        });

        if ($request->filled('office_id')) {
            $query->whereHas('personalDataSheet', fn($q) => $q->where('office_id', $request->office_id));
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereHas('personalDataSheet', fn($q2) => $q2
                    ->where('firstname', 'like', "%{$search}%")
                    ->orWhere('middlename', 'like', "%{$search}%")
                    ->orWhere('lastname', 'like', "%{$search}%")
                )
                ->orWhere('username', 'like', "%{$search}%");
            });
        }

        $users = $query->with('personalDataSheet.office')
                    ->paginate(10, ['*'], 'accounts_table')
                    ->withQueryString();

        return Inertia::render('Admin/Index', [
            'offices' => Office::all(),
            'accounts_paginated' => $users,
            'filters' => $request->only(['search', 'office_id']) // Pass filters back
        ]);
    }

}
