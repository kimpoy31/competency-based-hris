<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Office;
use App\Models\Spms\SpmsEmployee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(){
        return Inertia::render('Admin/Index',[
            'offices' => Office::all(),
            'employees' => SpmsEmployee::with('spmsUser')->get()
        ]);
    }
}
