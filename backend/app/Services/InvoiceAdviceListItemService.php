<?php

namespace App\Services;

use App\Models\InvoiceAdviceListItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class InvoiceAdviceListItemService
{
    public function validateInvoiceAdviceListItem(array $data, bool $isUpdate = false): array
    {
        $rules = [
            'customer_id' => ($isUpdate ? 'sometimes|' : 'required|') . 'exists:customers,id',
            'customer_site_id' => ($isUpdate ? 'sometimes|' : 'required|') . 'exists:customer_sites,id',
            'daily_consumption_id' => ($isUpdate ? 'sometimes|' : 'required|') . 'exists:daily_consumptions,id',
            'invoice_advice_id' => 'nullable|exists:invoice_advice,id',
            'volume' => ($isUpdate ? 'sometimes|' : 'required|') . 'numeric',
            'inlet_pressure' => 'nullable|numeric',
            'outlet_pressure' => 'nullable|numeric',
            'allocation' => 'nullable|string',
            'nomination' => 'nullable|string',
            'take_or_pay_value' => 'nullable|string',
            'daily_target' => 'nullable|string',
            'original_date' => ($isUpdate ? 'sometimes|' : 'required|') . 'date',
            'status' => ($isUpdate ? 'sometimes|' : 'required|') . 'integer|in:0,1',
        ];

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    public function getAllWithFilters(array $filters = [], int $perPage = 50)
    {
        $query = InvoiceAdviceListItem::query();

        foreach ($filters as $key => $value) {
            if (in_array($key, ['created_at_from', 'created_at_to', 'updated_at_from', 'updated_at_to'])) {
                $operator = str_contains($key, '_from') ? '>=' : '<=';
                $query->whereDate(str_replace(['_from', '_to'], '', $key), $operator, $value);
            } elseif (in_array($key, ['customer_id', 'customer_site_id', 'daily_consumption_id', 'invoice_advice_id', 'status'])) {
                $query->where($key, $value);
            }
        }

        return $query->paginate($perPage);
    }

    public function getById(int $id): InvoiceAdviceListItem
    {
        return InvoiceAdviceListItem::findOrFail($id);
    }

    public function create(array $data): InvoiceAdviceListItem
    {
        Log::info('Creating new invoice advice list item record', ['data' => $data]);

        return DB::transaction(function () use ($data) {
            $validatedData = $this->validateInvoiceAdviceListItem($data);
            return InvoiceAdviceListItem::create($validatedData);
        });
    }

    public function update(array $data): InvoiceAdviceListItem
    {
        $id = $data['id'] ?? null;
        if (!$id) {
            throw new \InvalidArgumentException('ID is required for update');
        }

        Log::info('Updating invoice advice list item record', ['id' => $id, 'data' => $data]);

        return DB::transaction(function () use ($id, $data) {
            $invoiceAdviceListItem = $this->getById($id);
            $validatedData = $this->validateInvoiceAdviceListItem($data, true);
            $invoiceAdviceListItem->update($validatedData);
            return $invoiceAdviceListItem;
        });
    }
}
