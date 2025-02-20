<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerDocumentResource;
use App\Services\CustomerDocumentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CustomerDocumentController extends Controller
{
    /**
     * The CustomerDocumentService instance.
     *
     * @var CustomerDocumentService
     */
    protected CustomerDocumentService $customerDocumentService;

    /**
     * CustomerDocumentController constructor.
     *
     * @param CustomerDocumentService $customerDocumentService
     */
    public function __construct(CustomerDocumentService $customerDocumentService)
    {
        $this->customerDocumentService = $customerDocumentService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $filters = $request->all();
            $per_page = $request->input('per_page', 50);

            $documents = $this->customerDocumentService->getAllWithFilters($filters, $per_page);

            return CustomerDocumentResource::collection($documents)
                ->additional([
                    'status' => 'success',
                    'pagination' => [
                        'current_page' => $documents->currentPage(),
                        'next_page_url' => $documents->nextPageUrl(),
                        'prev_page_url' => $documents->previousPageUrl(),
                        'per_page' => $documents->perPage(),
                        'total' => $documents->total(),
                        'last_page' => $documents->lastPage(),
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

            $document = $this->customerDocumentService->create(array_merge($request->all(), [
                'created_by_user_id' => $currentUser->id,
                'approval_status' => 1,
            ]));

            return (new CustomerDocumentResource($document))->additional([
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
    public function show(Request $request, string $id)
    {
        try {
            $customerId = $request->input('customer_id');
            $customerSiteId = $request->input('customer_site_id');
            $documentType = $request->input('document_type');
            $customerDocument = ($customerId && $customerSiteId && $documentType) ?
                $this->customerDocumentService->getByCustomerSiteDocType($customerId, $customerSiteId, $documentType) :
                $this->customerDocumentService->getById($id);

            return (new CustomerDocumentResource($customerDocument))->additional([
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
            $customerId = $request->input('customer_id');
            $customerSiteId = $request->input('customer_site_id');
            $documentType = $request->input('document_type');
            $customerDocument = ($customerId && $customerSiteId && $documentType) ?
                $this->customerDocumentService->getByCustomerSiteDocType($customerId, $customerSiteId, $documentType) :
                $this->customerDocumentService->getById($id);

            $updatedDocument = $this->customerDocumentService->update(array_merge($request->all(), ['id' => $customerDocument->id]));

            return (new CustomerDocumentResource($updatedDocument))->additional([
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
            $document = $this->customerDocumentService->getById($id);
            if($document->document_metadata) {
                $loc = $document->document_metadata['location'];
                $this->customerDocumentService->deleteFile($loc);
            }
            $document->delete();

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
