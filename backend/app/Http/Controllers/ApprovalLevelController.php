<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Services\ApprovalLevelService;
use Illuminate\Http\Request;

class ApprovalLevelController extends Controller
{
    /**
     * The ApprovalLevelService instance.
     *
     * @var ApprovalLevelService
     */
    protected ApprovalLevelService $approvalLevelService;

    /**
     * ApprovalLevelController constructor.
     *
     * @param ApprovalLevelService $approvalLevelService
     */
    public function __construct(ApprovalLevelService $approvalLevelService)
    {
        $this->approvalLevelService = $approvalLevelService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filters = $request->all();
            $per_page = $request->input('per_page', 50);

            $qpprovalLevels = $this->approvalLevelService->getAllWithFilters($filters, $per_page);

            return RoleResource::collection($qpprovalLevels)
                ->additional([
                    'status' => 'success',
                    'pagination' => [
                        'current_page' => $qpprovalLevels->currentPage(),
                        'next_page_url' => $qpprovalLevels->nextPageUrl(),
                        'prev_page_url' => $qpprovalLevels->previousPageUrl(),
                        'per_page' => $qpprovalLevels->perPage(),
                        'total' => $qpprovalLevels->total(),
                        'last_page' => $qpprovalLevels->lastPage(),
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
            $qpprovalLevel = $this->approvalLevelService->create($request->all());

            return (new RoleResource($qpprovalLevel))->additional([
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
            $qpprovalLevel = $this->approvalLevelService->getById($id);

            return (new RoleResource($qpprovalLevel))->additional([
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
            $qpprovalLevel = $this->approvalLevelService->getById($id);

            $updatedRole = $this->approvalLevelService->update(array_merge($request->all(), ['id' => $qpprovalLevel->id]));
            return (new RoleResource($updatedRole))->additional([
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
            $qpprovalLevel = $this->approvalLevelService->getById($id);
            $qpprovalLevel->delete();

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
