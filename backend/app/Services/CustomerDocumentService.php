<?php

namespace App\Services;

use App\Models\CustomerDocument;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
            'document_url' => 'required|string',
            'document_description' => 'nullable|string',
            'document_type' => 'required|string|in:' . implode(',', CustomerDocument::TYPES),
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

    public function create(array $data): CustomerDocument
    {
        Log::info('Creating new customer document record', ['data' => $data]);

        return DB::transaction(function () use ($data) {
            $validatedData = $this->validateCustomerDocument($data);
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
            $document->update($validatedData);
            return $document;
        });
    }
}
