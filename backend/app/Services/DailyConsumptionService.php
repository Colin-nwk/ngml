<?php

namespace App\Services;

use App\Models\DailyConsumption;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class DailyConsumptionService
{
    public function validateDailyConsumption(array $data, bool $isUpdate = false): array
    {
        $rules = [
            'customer_id' => ($isUpdate ? 'sometimes|' : 'required|') . 'exists:customers,id',
            'customer_site_id' => ($isUpdate ? 'sometimes|' : 'required|') . 'exists:customer_sites,id',
            'created_by_id' => ($isUpdate ? 'sometimes|' : 'required|') . 'exists:users,id',
            'approved_by_id' => 'nullable|exists:users,id',
            'volume' => ($isUpdate ? 'sometimes|' : 'required|') . 'numeric',
            'inlet_pressure' => 'nullable|numeric',
            'outlet_pressure' => 'nullable|numeric',
            'allocation' => 'nullable|string',
            'nomination' => 'nullable|string',
            'take_or_pay_value' => 'nullable|string',
            'daily_target' => 'nullable|string',
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
        $query = DailyConsumption::query();

        foreach ($filters as $key => $value) {
            if (in_array($key, ['created_at_from', 'created_at_to', 'updated_at_from', 'updated_at_to'])) {
                $operator = str_contains($key, '_from') ? '>=' : '<=';
                $query->whereDate(str_replace(['_from', '_to'], '', $key), $operator, $value);
            } elseif (in_array($key, ['customer_id', 'customer_site_id', 'created_by_id', 'approved_by_id', 'status'])) {
                $query->where($key, $value);
            }
        }

        return $query->paginate($perPage);
    }

    public function getById(int $id): DailyConsumption
    {
        return DailyConsumption::findOrFail($id);
    }

    public function create(array $data): DailyConsumption
    {
        Log::info('Creating new daily consumption record', ['data' => $data]);

        return DB::transaction(function () use ($data) {
            $validatedData = $this->validateDailyConsumption($data);
            return DailyConsumption::create($validatedData);
        });
    }

    public function update(array $data): DailyConsumption
    {
        $id = $data['id'] ?? null;
        if (!$id) {
            throw new \InvalidArgumentException('ID is required for update');
        }

        Log::info('Updating daily consumption record', ['id' => $id, 'data' => $data]);

        return DB::transaction(function () use ($id, $data) {
            $dailyConsumption = $this->getById($id);
            $validatedData = $this->validateDailyConsumption($data, true);
            $dailyConsumption->update($validatedData);
            return $dailyConsumption;
        });
    }
}
