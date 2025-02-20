<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Services\RoleService;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * The RoleService instance.
     *
     * @var RoleService
     */
    protected RoleService $roleService;

    /**
     * RoleController constructor.
     *
     * @param RoleService $roleService
     */
    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filters = $request->all();
            $per_page = $request->input('per_page', 50);

            $roles = $this->roleService->getAllWithFilters($filters, $per_page);

            return RoleResource::collection($roles)
                ->additional([
                    'status' => 'success',
                    'pagination' => [
                        'current_page' => $roles->currentPage(),
                        'next_page_url' => $roles->nextPageUrl(),
                        'prev_page_url' => $roles->previousPageUrl(),
                        'per_page' => $roles->perPage(),
                        'total' => $roles->total(),
                        'last_page' => $roles->lastPage(),
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
            $role = $this->roleService->create($request->all());

            return (new RoleResource($role))->additional([
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
            $role = $this->roleService->getById($id);

            return (new RoleResource($role))->additional([
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
            $role = $this->roleService->getById($id);

            $updatedRole = $this->roleService->update(array_merge($request->all(), ['id' => $role->id]));
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
            $role = $this->roleService->getById($id);
            $role->delete();

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
