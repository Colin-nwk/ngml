<?php

namespace App\Services;

use App\Models\Designation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class DesignationService
{
    public function validateDesignation(array $data, bool $isUpdate = false): array
    {
        $rules = [
            'role' => ($isUpdate ? 'sometimes|' : 'required|') . 'string|max:255',
            'description' => ($isUpdate ? 'sometimes|' : 'required|') . 'string',
            'level' => 'nullable|string|max:255',
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
        $query = Designation::query();

        foreach ($filters as $key => $value) {
            if (in_array($key, ['created_at_from', 'created_at_to', 'updated_at_from', 'updated_at_to'])) {
                $operator = str_contains($key, '_from') ? '>=' : '<=';
                $query->whereDate(str_replace(['_from', '_to'], '', $key), $operator, $value);
            } elseif (in_array($key, ['role', 'status', 'level'])) {
                $query->where($key, $value);
            }
        }

        return $query->paginate($perPage);
    }

    public function getById(int $id): Designation
    {
        return Designation::findOrFail($id);
    }

    public function create(array $data): Designation
    {
        Log::info('Creating new designation record', ['data' => $data]);

        return DB::transaction(function () use ($data) {
            $validatedData = $this->validateDesignation($data);
            return Designation::create($validatedData);
        });
    }

    public function update(array $data): Designation
    {
        $id = $data['id'] ?? null;
        if (!$id) {
            throw new \InvalidArgumentException('ID is required for update');
        }

        Log::info('Updating designation record', ['id' => $id, 'data' => $data]);

        return DB::transaction(function () use ($id, $data) {
            $designation = $this->getById($id);
            $validatedData = $this->validateDesignation($data, true);
            $designation->update($validatedData);
            return $designation;
        });
    }
}
