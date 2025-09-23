<?php

namespace App\Http\Controllers;

use App\Models\Spms\SpmsUser;
use Illuminate\Http\Request;

class UtilsController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q');

        $results = SpmsUser::with('spmsEmployee')
            ->where('username', 'like', "%{$query}%")
            ->orWhereHas('spmsEmployee', function ($q) use ($query) {
                $q->where('firstname', 'like', "%{$query}%")
                ->orWhere('middlename', 'like', "%{$query}%")
                ->orWhere('lastname', 'like', "%{$query}%");
            })
            ->limit(20)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $results,
        ]);
    }

}
