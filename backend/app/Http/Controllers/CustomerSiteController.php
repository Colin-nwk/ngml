<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerSiteResource;
use App\Services\CustomerSiteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CustomerSiteController extends Controller
{
    /**
     * The CustomerSiteService instance.
     *
     * @var CustomerSiteService
     */
    protected CustomerSiteService $customerSiteService;

    /**
     * CustomerSiteController constructor.
     *
     * @param CustomerSiteService $customerSiteService
     */
    public function __construct(CustomerSiteService $customerSiteService)
    {
        $this->customerSiteService = $customerSiteService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filters = $request->all();
            $per_page = $request->input('per_page', 50);

            $customerSites = $this->customerSiteService->getAllWithFilters($filters, $per_page);

            return CustomerSiteResource::collection($customerSites)
                ->additional([
                    'status' => 'success',
                    'pagination' => [
                        'current_page' => $customerSites->currentPage(),
                        'next_page_url' => $customerSites->nextPageUrl(),
                        'prev_page_url' => $customerSites->previousPageUrl(),
                        'per_page' => $customerSites->perPage(),
                        'total' => $customerSites->total(),
                        'last_page' => $customerSites->lastPage(),
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

            $customerSite = $this->customerSiteService->create(array_merge($request->all(), [
                'created_by_user_id' => $currentUser->id,
                'status' => 1,
            ]));

            return (new CustomerSiteResource($customerSite))->additional([
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
            $customerSite = $this->customerSiteService->getById($id);

            return (new CustomerSiteResource($customerSite))->additional([
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
            $customerSite = $this->customerSiteService->getById($id);

            $updatedCustomerSite = $this->customerSiteService->update(array_merge($request->all(), ['id' => $customerSite->id]));
            return (new CustomerSiteResource($updatedCustomerSite))->additional([
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
            $customerSite = $this->customerSiteService->getById($id);
            $customerSite->delete();

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
