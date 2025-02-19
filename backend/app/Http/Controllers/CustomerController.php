<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerResource;
use App\Services\CustomerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
{
    /**
     * The CustomerService instance.
     *
     * @var CustomerService
     */
    protected CustomerService $customerService;

    /**
     * CustomerController constructor.
     *
     * @param CustomerService $customerService
     */
    public function __construct(CustomerService $customerService)
    {
        $this->customerService = $customerService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filters = $request->all();
            $per_page = $request->input('per_page', 50);

            $customers = $this->customerService->getAllWithFilters($filters, $per_page);

            return CustomerResource::collection($customers)
                ->additional([
                    'status' => 'success',
                    'pagination' => [
                        'current_page' => $customers->currentPage(),
                        'next_page_url' => $customers->nextPageUrl(),
                        'prev_page_url' => $customers->previousPageUrl(),
                        'per_page' => $customers->perPage(),
                        'total' => $customers->total(),
                        'last_page' => $customers->lastPage(),
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
            $customer = $this->customerService->create(array_merge($request->all(), [
                'created_by_user_id' => $currentUser->id,
                'status' => 0,
            ]));

            return (new CustomerResource($customer))->additional([
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
            $customer = $this->customerService->getById($id);

            return (new CustomerResource($customer))->additional([
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
            $customer = $this->customerService->getById($id);
            $updatedCustomer = $this->customerService->update(array_merge($request->all(), ['id' => $customer->id]));

            return (new CustomerResource($updatedCustomer))->additional([
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
            $customer = $this->customerService->getById($id);
            $customer->delete();

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
