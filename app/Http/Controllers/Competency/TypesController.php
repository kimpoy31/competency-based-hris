<?php

namespace App\Http\Controllers\Competency;

use App\Http\Controllers\Controller;
use App\Models\CompetencyType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypesController extends Controller
{
    public function index(){
        return Inertia::render('Competency/Types/Index',[
            'competencyTypes' => CompetencyType::all()
            ->with([
                'jobFamilies' => function($query) { $query->where('status','active'); } 
            ])
            ->get(),
        ]);
    }
}
