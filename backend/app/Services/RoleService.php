<?php

namespace App\Services;

use App\Models\Role;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class RoleService
{
    public function validateRole(array $data, bool $isUpdate = false): array
    {
        $rules = [
            'name' => ($isUpdate ? 'sometimes|' : 'required|') . 'string|max:255|unique:roles,name|in:' . implode(',', Role::ROLES),
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
        $query = Role::query();

        foreach ($filters as $key => $value) {
            if (in_array($key, ['created_at_from', 'created_at_to', 'updated_at_from', 'updated_at_to'])) {
                $operator = str_contains($key, '_from') ? '>=' : '<=';
                $query->whereDate(str_replace(['_from', '_to'], '', $key), $operator, $value);
            } elseif (in_array($key, ['name'])) {
                $query->where($key, 'like', "%$value%");
            }
        }

        return $query->paginate($perPage);
    }

    public function getById(int $id): Role
    {
        return Role::findOrFail($id);
    }

    public function create(array $data)
    {
        Log::info('Creating new role', ['data' => $data]);

        return DB::transaction(function () use ($data) {
            $validatedData = $this->validateRole($data);
            return Role::create($validatedData);
        });
    }

    public function update(array $data): Role
    {
        $id = $data['id'] ?? null;
        if (!$id) {
            throw new \InvalidArgumentException('ID is required for update');
        }

        Log::info('Updating role', ['id' => $id, 'data' => $data]);

        return DB::transaction(function () use ($id, $data) {
            $role = $this->getById($id);
            $validatedData = $this->validateRole($data, true);
            $role->update($validatedData);
            return $role;
        });
    }
}
