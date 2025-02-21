<?php

namespace App\Services;

use App\Models\Unit;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class UnitService
{
    public function validateUnit(array $data, bool $isUpdate = false): array
    {
        $rules = [
            'name' => ($isUpdate ? 'sometimes|' : 'required|') . 'string|max:255',
            'description' => 'nullable|string',
        ];

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    public function getAllWithFilters(array $filters = [], int $perPage = 50)
    {
        $query = Unit::query();

        foreach ($filters as $key => $value) {
            if (in_array($key, ['created_at_from', 'created_at_to', 'updated_at_from', 'updated_at_to'])) {
                $operator = str_contains($key, '_from') ? '>=' : '<=';
                $query->whereDate(str_replace(['_from', '_to'], '', $key), $operator, $value);
            } elseif (in_array($key, ['name'])) {
                $query->where($key, $value);
            }
        }

        return $query->paginate($perPage);
    }

    public function getById(int $id): Unit
    {
        return Unit::findOrFail($id);
    }

    public function create(array $data): Unit
    {
        Log::info('Creating new unit record', ['data' => $data]);

        return DB::transaction(function () use ($data) {
            $validatedData = $this->validateUnit($data);
            return Unit::create($validatedData);
        });
    }

    public function update(array $data): Unit
    {
        $id = $data['id'] ?? null;
        if (!$id) {
            throw new \InvalidArgumentException('ID is required for update');
        }

        Log::info('Updating unit record', ['id' => $id, 'data' => $data]);

        return DB::transaction(function () use ($id, $data) {
            $unit = $this->getById($id);
            $validatedData = $this->validateUnit($data, true);
            $unit->update($validatedData);
            return $unit;
        });
    }
}
