<?php

namespace App\Http\Controllers;

use App\Http\Resources\LocationResource;
use App\Services\LocationService;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    /**
     * The LocationService instance.
     *
     * @var LocationService
     */
    protected LocationService $locationService;

    /**
     * LocationController constructor.
     *
     * @param LocationService $locationService
     */
    public function __construct(LocationService $locationService)
    {
        $this->locationService = $locationService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filters = $request->all();
            $per_page = $request->input('per_page', 50);

            $locations = $this->locationService->getAllWithFilters($filters, $per_page);

            return LocationResource::collection($locations)
                ->additional([
                    'status' => 'success',
                    'pagination' => [
                        'current_page' => $locations->currentPage(),
                        'next_page_url' => $locations->nextPageUrl(),
                        'prev_page_url' => $locations->previousPageUrl(),
                        'per_page' => $locations->perPage(),
                        'total' => $locations->total(),
                        'last_page' => $locations->lastPage(),
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
            $location = $this->locationService->create($request->all());

            return (new LocationResource($location))->additional([
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
            $location = $this->locationService->getById($id);

            return (new LocationResource($location))->additional([
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
            $location = $this->locationService->getById($id);

            $updatedLocation = $this->locationService->update(array_merge($request->all(), ['id' => $location->id]));
            return (new LocationResource($updatedLocation))->additional([
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
            $location = $this->locationService->getById($id);
            $location->delete();

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
