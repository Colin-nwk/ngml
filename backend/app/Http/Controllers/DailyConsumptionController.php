<?php

namespace App\Http\Controllers;

use App\Http\Resources\DailyConsumptionResource;
use App\Services\DailyConsumptionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DailyConsumptionController extends Controller
{
    /**
     * The DailyConsumptionService instance.
     *
     * @var DailyConsumptionService
     */
    protected DailyConsumptionService $dailyConsumptionService;

    /**
     * DailyConsumptionController constructor.
     *
     * @param DailyConsumptionService $dailyConsumptionService
     */
    public function __construct(DailyConsumptionService $dailyConsumptionService)
    {
        $this->dailyConsumptionService = $dailyConsumptionService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filters = $request->all();
            $per_page = $request->input('per_page', 50);

            $consumptions = $this->dailyConsumptionService->getAllWithFilters($filters, $per_page);

            return DailyConsumptionResource::collection($consumptions)
                ->additional([
                    'status' => 'success',
                    'pagination' => [
                        'current_page' => $consumptions->currentPage(),
                        'next_page_url' => $consumptions->nextPageUrl(),
                        'prev_page_url' => $consumptions->previousPageUrl(),
                        'per_page' => $consumptions->perPage(),
                        'total' => $consumptions->total(),
                        'last_page' => $consumptions->lastPage(),
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
            $currentUser = Auth::user();

            $consumption = $this->dailyConsumptionService->create(array_merge($request->all(), [
                'created_by_id' => $currentUser->id,
                'status' => 1,
            ]));

            return (new DailyConsumptionResource($consumption))->additional([
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
            $consumption = $this->dailyConsumptionService->getById($id);

            return (new DailyConsumptionResource($consumption))->additional([
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
            $consumption = $this->dailyConsumptionService->getById($id);
            $updatedConsumption = $this->dailyConsumptionService->update(array_merge($request->all(), ['id' => $consumption->id]));

            return (new DailyConsumptionResource($updatedConsumption))->additional([
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
            $consumption = $this->dailyConsumptionService->getById($id);
            $consumption->delete();

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
