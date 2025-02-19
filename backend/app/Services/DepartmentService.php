<?php

namespace App\Services;

use App\Models\Department;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class DepartmentService
{
    public function validateDepartment(array $data, bool $isUpdate = false): array
    {
        $rules = [
            'name' => ($isUpdate ? 'sometimes|' : 'required|') . 'string|max:255',
            'description' => 'nullable|string',
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
        $query = Department::query();

        foreach ($filters as $key => $value) {
            if (in_array($key, ['created_at_from', 'created_at_to', 'updated_at_from', 'updated_at_to'])) {
                $operator = str_contains($key, '_from') ? '>=' : '<=';
                $query->whereDate(str_replace(['_from', '_to'], '', $key), $operator, $value);
            } elseif (in_array($key, ['name', 'status'])) {
                $query->where($key, $value);
            }
        }

        return $query->paginate($perPage);
    }

    public function getById(int $id): Department
    {
        return Department::findOrFail($id);
    }

    public function create(array $data): Department
    {
        Log::info('Creating new department record', ['data' => $data]);

        return DB::transaction(function () use ($data) {
            $validatedData = $this->validateDepartment($data);
            return Department::create($validatedData);
        });
    }

    public function update(array $data): Department
    {
        $id = $data['id'] ?? null;
        if (!$id) {
            throw new \InvalidArgumentException('ID is required for update');
        }

        Log::info('Updating department record', ['id' => $id, 'data' => $data]);

        return DB::transaction(function () use ($id, $data) {
            $department = $this->getById($id);
            $validatedData = $this->validateDepartment($data, true);
            $department->update($validatedData);
            return $department;
        });
    }
}
