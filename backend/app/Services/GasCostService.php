<?php

namespace App\Services;

use App\Models\GasCost;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class GasCostService
{
    public function validateGasCost(array $data, bool $isUpdate = false): array
    {
        $rules = [
            'date_of_entry' => ($isUpdate ? 'sometimes|' : 'required|') . 'date',
            'dollar_cost_per_scf' => ($isUpdate ? 'sometimes|' : 'required|') . 'numeric|min:0',
            'dollar_rate' => ($isUpdate ? 'sometimes|' : 'required|') . 'numeric|min:0',
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
        $query = GasCost::query();

        foreach ($filters as $key => $value) {
            if (in_array($key, ['date_of_entry_from', 'date_of_entry_to', 'created_at_from', 'created_at_to', 'updated_at_from', 'updated_at_to'])) {
                $operator = str_contains($key, '_from') ? '>=' : '<=';
                $query->whereDate(str_replace(['_from', '_to'], '', $key), $operator, $value);
            } elseif (in_array($key, ['dollar_cost_per_scf', 'dollar_rate', 'status'])) {
                $query->where($key, $value);
            }
        }

        return $query->paginate($perPage);
    }

    public function getById(int $id): GasCost
    {
        return GasCost::findOrFail($id);
    }

    public function create(array $data): GasCost
    {
        Log::info('Creating new gas cost record', ['data' => $data]);

        return DB::transaction(function () use ($data) {
            $validatedData = $this->validateGasCost($data);
            return GasCost::create($validatedData);
        });
    }

    public function update(array $data): GasCost
    {
        $id = $data['id'] ?? null;
        if (!$id) {
            throw new \InvalidArgumentException('ID is required for update');
        }

        Log::info('Updating gas cost record', ['id' => $id, 'data' => $data]);

        return DB::transaction(function () use ($id, $data) {
            $gasCost = $this->getById($id);
            $validatedData = $this->validateGasCost($data, true);
            $gasCost->update($validatedData);
            return $gasCost;
        });
    }
}
