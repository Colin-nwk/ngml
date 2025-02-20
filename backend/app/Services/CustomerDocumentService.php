<?php

namespace App\Services;

use App\Models\CustomerDocument;
use App\Models\FileObject;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CustomerDocumentService
{
    public function validateCustomerDocument(array $data, bool $isUpdate = false): array
    {
        $rules = [
            'created_by_user_id' => ($isUpdate ? 'sometimes|' : 'required|') . 'exists:users,id',
            'customer_id' => ($isUpdate ? 'sometimes|' : 'required|') . 'exists:customers,id',
            'customer_site_id' => ($isUpdate ? 'sometimes|' : 'required|') . 'exists:customer_sites,id',
            'document_name' => 'nullable|string|max:255',
            'document_description' => 'nullable|string',
            'document_type' => ($isUpdate ? 'sometimes|' : 'required|') . 'string|in:' . implode(',', CustomerDocument::TYPES),
            'document_file' => ($isUpdate ? 'sometimes|' : 'required|') . 'file',
            'document_date' => 'nullable|date',
            'approval_status' => ($isUpdate ? 'sometimes|' : 'required|') . 'boolean',
        ];

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    public function getAllWithFilters(array $filters = [], int $perPage = 50)
    {
        $query = CustomerDocument::query();

        foreach ($filters as $key => $value) {
            if (in_array($key, ['created_at_from', 'created_at_to', 'updated_at_from', 'updated_at_to', 'document_date_from', 'document_date_to'])) {
                $operator = str_contains($key, '_from') ? '>=' : '<=';
                $query->whereDate(str_replace(['_from', '_to'], '', $key), $operator, $value);
            } elseif (in_array($key, ['customer_id', 'customer_site_id', 'created_by_user_id', 'document_type', 'approval_status'])) {
                $query->where($key, $value);
            }
        }

        return $query->paginate($perPage);
    }

    public function getById(int $id): CustomerDocument
    {
        return CustomerDocument::findOrFail($id);
    }

    public function getByCustomerSiteDocType(int $customerId, int $customerSiteId, string $documentType): CustomerDocument
    {
        $customerDocument = CustomerDocument::where('customer_id', $customerId)
            ->where('customer_site_id', $customerSiteId)
            ->where('document_type', $documentType)
            ->first();
        if(!$customerDocument) {
            throw new \InvalidArgumentException('Customer document not found');
        }
        return $customerDocument;
    }

    public function create(array $data): CustomerDocument
    {
        Log::info('Creating new customer document record', ['data' => $data]);

        return DB::transaction(function () use ($data) {
            $validatedData = $this->validateCustomerDocument($data);

            $existingDocument = CustomerDocument::where('customer_id', $validatedData['customer_id'])
                ->where('customer_site_id', $validatedData['customer_site_id'])
                ->where('document_type', $validatedData['document_type'])
                ->first();
            if ($existingDocument) {
                throw new \InvalidArgumentException('Document type: (' . $validatedData['document_type'] . ') already uploaded for this customer and site.');
            }

            $file = request()->file('document_file');
            $fileObject = $this->uploadFile($file);
            $fileObject = $fileObject->copyWith(url: request()->root() . '/storage/' . $fileObject->location);
            $validatedData['document_metadata'] = $fileObject->toArray();

            return CustomerDocument::create($validatedData);
        });
    }

    public function update(array $data): CustomerDocument
    {
        $id = $data['id'] ?? null;
        if (!$id) {
            throw new \InvalidArgumentException('ID is required for update');
        }

        Log::info('Updating customer document record', ['id' => $id, 'data' => $data]);

        return DB::transaction(function () use ($id, $data) {
            $document = $this->getById($id);
            $validatedData = $this->validateCustomerDocument($data, true);

            if(request()->hasFile('document_file')) {
                $file = request()->file('document_file');
                $fileObject = $this->uploadFile($file);
                $fileObject = $fileObject->copyWith(url: request()->root() . '/storage/' . $fileObject->location);
                $validatedData['document_metadata'] = $fileObject->toArray();
                if($document->document_metadata) {
                    $fileObject = new FileObject(
                        $document->document_metadata['name'],
                        $document->document_metadata['extension'],
                        $document->document_metadata['size'],
                        $document->document_metadata['mimetype'],
                        $document->document_metadata['location'],
                    );
                    $this->deleteFile($fileObject->location);
                }
            }

            $document->update($validatedData);
            return $document;
        });
    }

    /**
     * Upload a file.
     *
     * @param UploadedFile $file The uploaded file.
     * @return FileObject The file object containing file details.
     */
    private function uploadFile(UploadedFile $file, string $folder = 'documents'): FileObject
    {
        // Determine the storage disk
        $disk = config('filesystems.default');

        // Store the file on the determined disk
        $path = $file->store($folder, $disk);

        // Create a FileObject instance
        $fileObject = new FileObject(
            $file->getClientOriginalName(),
            $file->getClientOriginalExtension(),
            $file->getSize(),
            $file->getClientMimeType(),
            $path
        );

        return $fileObject;
    }

    public function deleteFile(string $location) {
        $disk = config('filesystems.default');

        try {
            return Storage::disk($disk)->delete($location);
        } catch (\Throwable $th) {
            Log::error('Error deleting file', ['location' => $location, 'error' => $th->getMessage()]);
        }
    }
}
