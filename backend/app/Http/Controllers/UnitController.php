<?php

namespace App\Http\Controllers;

use App\Http\Resources\UnitResource;
use App\Services\UnitService;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    /**
     * The UnitService instance.
     *
     * @var UnitService
     */
    protected UnitService $unitService;

    /**
     * UnitController constructor.
     *
     * @param UnitService $unitService
     */
    public function __construct(UnitService $unitService)
    {
        $this->unitService = $unitService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filters = $request->all();
            $per_page = $request->input('per_page', 50);

            $units = $this->unitService->getAllWithFilters($filters, $per_page);

            return UnitResource::collection($units)
                ->additional([
                    'status' => 'success',
                    'pagination' => [
                        'current_page' => $units->currentPage(),
                        'next_page_url' => $units->nextPageUrl(),
                        'prev_page_url' => $units->previousPageUrl(),
                        'per_page' => $units->perPage(),
                        'total' => $units->total(),
                        'last_page' => $units->lastPage(),
                    ]
                ])
                ->response()
                ->setStatusCode(200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $unit = $this->unitService->create($request->all());

            return (new UnitResource($unit))->additional([
                'status' => 'success'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $unit = $this->unitService->getById($id);

            return (new UnitResource($unit))->additional([
                'status' => 'success'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Record not found',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $unit = $this->unitService->getById($id);

            $updatedUnit = $this->unitService->update(array_merge($request->all(), ['id' => $unit->id]));
            return (new UnitResource($updatedUnit))->additional([
                'status' => 'success'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Record not found',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $unit = $this->unitService->getById($id);
            $unit->delete();

            return response()->json([
                'status' => 'success'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Record not found',
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
