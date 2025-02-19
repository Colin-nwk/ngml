<?php

namespace App\Services;

use App\Models\Customer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CustomerService
{
    public function validateCustomer(array $data, bool $isUpdate = false): array
    {
        $rules = [
            'company_name' => ($isUpdate ? 'sometimes|' : 'required|') . 'string|max:255',
            'email' => ($isUpdate ? 'sometimes|' : 'required|') . 'email|unique:customers,email' . ($isUpdate ? ',' . ($data['id'] ?? 'NULL') : ''),
            'phone_number' => ($isUpdate ? 'sometimes|' : 'required|') . 'string|max:20',
            'created_by_user_id' => ($isUpdate ? 'sometimes|' : 'required|') . 'exists:users,id',
            'status' => ($isUpdate ? 'sometimes|' : 'required|') . 'boolean',
        ];

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    public function getAllWithFilters(array $filters = [], int $perPage = 50)
    {
        $query = Customer::query();

        foreach ($filters as $key => $value) {
            if (in_array($key, ['created_at_from', 'created_at_to', 'updated_at_from', 'updated_at_to'])) {
                $operator = str_contains($key, '_from') ? '>=' : '<=';
                $query->whereDate(str_replace(['_from', '_to'], '', $key), $operator, $value);
            } elseif (in_array($key, ['company_name', 'email', 'status'])) {
                $query->where($key, $value);
            }
        }

        return $query->paginate($perPage);
    }

    public function getById(int $id): Customer
    {
        return Customer::findOrFail($id);
    }

    public function create(array $data): Customer
    {
        Log::info('Creating new customer record', ['data' => $data]);

        return DB::transaction(function () use ($data) {
            $validatedData = $this->validateCustomer($data);
            return Customer::create($validatedData);
        });
    }

    public function update(array $data): Customer
    {
        $id = $data['id'] ?? null;
        if (!$id) {
            throw new \InvalidArgumentException('ID is required for update');
        }

        Log::info('Updating customer record', ['id' => $id, 'data' => $data]);

        return DB::transaction(function () use ($id, $data) {
            $customer = $this->getById($id);
            $validatedData = $this->validateCustomer($data, true);
            $customer->update($validatedData);
            return $customer;
        });
    }
}
