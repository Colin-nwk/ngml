<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class TaskService
{
    public function validateTask(array $data, bool $isUpdate = false): array
    {
        $rules = [
            'assignee_id' => 'nullable|exists:users,id',
            'type' => ($isUpdate ? 'sometimes|' : 'required|') . 'string|max:255',
        ];

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    public function getAllWithFilters(array $filters = [], int $perPage = 50)
    {
        $query = Task::query();

        foreach ($filters as $key => $value) {
            if (in_array($key, ['created_at_from', 'created_at_to', 'updated_at_from', 'updated_at_to'])) {
                $operator = str_contains($key, '_from') ? '>=' : '<=';
                $query->whereDate(str_replace(['_from', '_to'], '', $key), $operator, $value);
            } elseif (in_array($key, ['assignee_id', 'type'])) {
                $query->where($key, $value);
            }
        }

        return $query->paginate($perPage);
    }

    public function getById(int $id): Task
    {
        return Task::findOrFail($id);
    }

    public function create(array $data): Task
    {
        Log::info('Creating new task record', ['data' => $data]);

        return DB::transaction(function () use ($data) {
            $validatedData = $this->validateTask($data);
            return Task::create($validatedData);
        });
    }

    public function update(array $data): Task
    {
        $id = $data['id'] ?? null;
        if (!$id) {
            throw new \InvalidArgumentException('ID is required for update');
        }

        Log::info('Updating task record', ['id' => $id, 'data' => $data]);

        return DB::transaction(function () use ($id, $data) {
            $task = $this->getById($id);
            $validatedData = $this->validateTask($data, true);
            $task->update($validatedData);
            return $task;
        });
    }
}
