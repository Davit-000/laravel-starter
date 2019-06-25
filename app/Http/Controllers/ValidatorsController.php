<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ValidatorsController extends Controller
{
    /**
     * Async unique validator
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function unique(Request $request)
    {
        $table = $request->query('table');
        $col = $request->query('col');
        $mode = $request->input('mode') === 'edit' ? ',' . auth()->id() : '';

        $validator = Validator::make($request->all(), [
            $col => "unique:$table,$col$mode"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'valid' => false,
                'data' => ['message' => $validator->errors()->first($col)]
            ], 200);
        }

        return response()->json(['valid' => true], 200);
    }

    /**
     * Async Exists validator
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function exists(Request $request)
    {
        $table = $request->query('table');
        $col = $request->query('col');

        $validator = Validator::make($request->all(), [
            $col => "exists:$table,$col"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'valid' => false,
                'data' => ['message' => $validator->errors()->first($col)]
            ]);
        }

        return response()->json(['valid' => true], 200);
    }
}
