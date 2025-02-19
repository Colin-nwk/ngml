<?php

namespace App\Services;

use App\Models\InvoiceAdvice;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class InvoiceAdviceService
{
    public function validateInvoiceAdvice(array $data, bool $isUpdate = false): array
    {
        $rules = [
            'customer_id' => ($isUpdate ? 'sometimes|' : 'required|') . 'exists:customers,id',
            'customer_site_id' => ($isUpdate ? 'sometimes|' : 'required|') . 'exists:customer_sites,id',
            'created_by_id' => 'nullable|exists:users,id',
            'approval_level_id' => 'nullable|exists:approval_levels,id',
            'with_vat' => 'nullable|boolean',
            'capex_recovery_amount' => 'nullable|string',
            'invoice_advice_date' => ($isUpdate ? 'sometimes|' : 'required|') . 'date_format:Y-m-d H:i:s',
            'status' => ($isUpdate ? 'sometimes|' : 'required|') . 'integer|in:0,1',
            'from_date' => 'nullable|date',
            'to_date' => 'nullable|date',
            'total_quantity_of_gas' => 'nullable|numeric',
            'department' => 'required|string|max:255',
        ];

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    public function getAllWithFilters(array $filters = [], int $perPage = 50)
    {
        $query = InvoiceAdvice::query();

        foreach ($filters as $key => $value) {
            if (in_array($key, ['created_at_from', 'created_at_to', 'updated_at_from', 'updated_at_to'])) {
                $operator = str_contains($key, '_from') ? '>=' : '<=';
                $query->whereDate(str_replace(['_from', '_to'], '', $key), $operator, $value);
            } elseif (in_array($key, ['customer_id', 'customer_site_id', 'status', 'department'])) {
                $query->where($key, $value);
            }
        }

        return $query->paginate($perPage);
    }

    public function getById(int $id): InvoiceAdvice
    {
        return InvoiceAdvice::findOrFail($id);
    }

    public function create(array $data): InvoiceAdvice
    {
        Log::info('Creating new invoice advice record', ['data' => $data]);

        return DB::transaction(function () use ($data) {
            $validatedData = $this->validateInvoiceAdvice($data);
            return InvoiceAdvice::create($validatedData);
        });
    }

    public function update(array $data): InvoiceAdvice
    {
        $id = $data['id'] ?? null;
        if (!$id) {
            throw new \InvalidArgumentException('ID is required for update');
        }

        Log::info('Updating invoice advice record', ['id' => $id, 'data' => $data]);

        return DB::transaction(function () use ($id, $data) {
            $invoiceAdvice = $this->getById($id);
            $validatedData = $this->validateInvoiceAdvice($data, true);
            $invoiceAdvice->update($validatedData);
            return $invoiceAdvice;
        });
    }
}
