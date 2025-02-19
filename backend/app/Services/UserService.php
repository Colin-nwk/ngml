<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class UserService
{
    public function validateUser(array $data, bool $isUpdate = false): array
    {
        $rules = [
            'role_id' => 'nullable|exists:roles,id',
            'department_id' => 'nullable|exists:departments,id',
            'location_id' => 'nullable|exists:locations,id',
            'designation_id' => 'nullable|exists:designations,id',
            'unit_id' => 'nullable|exists:units,id',
            'approval_level_id' => 'nullable|exists:approval_levels,id',
            'name' => ($isUpdate ? 'sometimes|' : 'required|') . 'string|max:255',
            'email' => ($isUpdate ? 'sometimes|' : 'required|') . 'email|unique:users,email' . ($isUpdate ? ',' . ($data['id'] ?? 'NULL') : ''),
            'password' => $isUpdate ? 'sometimes|nullable|string|min:8' : 'required|string|min:8',
            'azure_id' => 'nullable|string',
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
        $query = User::query();

        foreach ($filters as $key => $value) {
            if (in_array($key, ['created_at_from', 'created_at_to', 'updated_at_from', 'updated_at_to'])) {
                $operator = str_contains($key, '_from') ? '>=' : '<=';
                $query->whereDate(str_replace(['_from', '_to'], '', $key), $operator, $value);
            } elseif (in_array($key, ['name', 'email', 'status'])) {
                $query->where($key, $value);
            }
        }

        return $query->paginate($perPage);
    }

    public function getById(int $id): User
    {
        return User::findOrFail($id);
    }

    public function create(array $data): User
    {
        Log::info('Creating new user record', ['data' => $data]);

        return DB::transaction(function () use ($data) {
            $validatedData = $this->validateUser($data);
            $validatedData['password'] = bcrypt($validatedData['password']);
            return User::create($validatedData);
        });
    }

    public function update(array $data): User
    {
        $id = $data['id'] ?? null;
        if (!$id) {
            throw new \InvalidArgumentException('ID is required for update');
        }

        Log::info('Updating user record', ['id' => $id, 'data' => $data]);

        return DB::transaction(function () use ($id, $data) {
            $user = $this->getById($id);
            $validatedData = $this->validateUser($data, true);

            if (isset($validatedData['password'])) {
                $validatedData['password'] = Hash::make($validatedData['password']);
            }

            $user->update($validatedData);
            return $user;
        });
    }
}
