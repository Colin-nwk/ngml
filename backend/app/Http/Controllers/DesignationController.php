<?php

namespace App\Http\Controllers;

use App\Http\Resources\DesignationResource;
use App\Services\DesignationService;
use Illuminate\Http\Request;

class DesignationController extends Controller
{
    /**
     * The DesignationService instance.
     *
     * @var DesignationService
     */
    protected DesignationService $designationService;

    /**
     * DesignationController constructor.
     *
     * @param DesignationService $designationService
     */
    public function __construct(DesignationService $designationService)
    {
        $this->designationService = $designationService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filters = $request->all();
            $per_page = $request->input('per_page', 50);

            $designations = $this->designationService->getAllWithFilters($filters, $per_page);

            return DesignationResource::collection($designations)
                ->additional([
                    'status' => 'success',
                    'pagination' => [
                        'current_page' => $designations->currentPage(),
                        'next_page_url' => $designations->nextPageUrl(),
                        'prev_page_url' => $designations->previousPageUrl(),
                        'per_page' => $designations->perPage(),
                        'total' => $designations->total(),
                        'last_page' => $designations->lastPage(),
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
            $designation = $this->designationService->create($request->all());

            return (new DesignationResource($designation))->additional([
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
            $designation = $this->designationService->getById($id);

            return (new DesignationResource($designation))->additional([
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
            $designation = $this->designationService->getById($id);

            $updatedDesignation = $this->designationService->update(array_merge($request->all(), ['id' => $designation->id]));

            return (new DesignationResource($updatedDesignation))->additional([
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
            $designation = $this->designationService->getById($id);
            $designation->delete();

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
