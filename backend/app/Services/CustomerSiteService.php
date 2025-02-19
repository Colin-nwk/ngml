<?php

namespace App\Services;

use App\Models\CustomerSite;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CustomerSiteService
{
    public function validateCustomerSite(array $data, bool $isUpdate = false): array
    {
        $rules = [
            'created_by_user_id' => ($isUpdate ? 'sometimes|' : 'required|') . 'exists:users,id',
            'customer_id' => ($isUpdate ? 'sometimes|' : 'required|') . 'exists:customers,id',
            'location_id' => 'nullable|exists:locations,id',
            'site_address' => 'required|string|max:255',
            'site_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'site_contact_person_name' => 'required|string|max:255',
            'site_contact_person_email' => 'required|email|max:255',
            'site_contact_person_phone_number' => 'required|string|max:20',
            'site_contact_person_signature' => 'nullable|string',
            'site_existing_status' => 'boolean',
            'rate' => 'nullable|string|max:255',
            'status' => 'boolean',
        ];

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    public function getAllWithFilters(array $filters = [], int $perPage = 50)
    {
        $query = CustomerSite::query();

        foreach ($filters as $key => $value) {
            if (in_array($key, ['created_at_from', 'created_at_to', 'updated_at_from', 'updated_at_to'])) {
                $operator = str_contains($key, '_from') ? '>=' : '<=';
                $query->whereDate(str_replace(['_from', '_to'], '', $key), $operator, $value);
            } elseif (in_array($key, ['customer_id', 'location_id', 'site_existing_status', 'status'])) {
                $query->where($key, $value);
            } elseif (in_array($key, ['site_name', 'site_address', 'email'])) {
                $query->where($key, 'LIKE', "%$value%");
            }
        }

        return $query->paginate($perPage);
    }

    public function getById(int $id): CustomerSite
    {
        return CustomerSite::findOrFail($id);
    }

    public function create(array $data): CustomerSite
    {
        Log::info('Creating new customer site record', ['data' => $data]);

        return DB::transaction(function () use ($data) {
            $validatedData = $this->validateCustomerSite($data);
            return CustomerSite::create($validatedData);
        });
    }

    public function update(array $data): CustomerSite
    {
        $id = $data['id'] ?? null;
        if (!$id) {
            throw new \InvalidArgumentException('ID is required for update');
        }

        Log::info('Updating customer site record', ['id' => $id, 'data' => $data]);

        return DB::transaction(function () use ($id, $data) {
            $customerSite = $this->getById($id);
            $validatedData = $this->validateCustomerSite($data, true);
            $customerSite->update($validatedData);
            return $customerSite;
        });
    }
}
