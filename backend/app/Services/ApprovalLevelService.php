<?php

namespace App\Services;

use App\Models\ApprovalLevel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ApprovalLevelService
{
    public function validateApprovalLevel(array $data, bool $isUpdate = false): array
    {
        $rules = [
            'name' => ($isUpdate ? 'sometimes|' : 'required|') . 'string|max:255|in:' . implode(',', ApprovalLevel::APPROVAL_LEVELS),
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
        $query = ApprovalLevel::query();

        foreach ($filters as $key => $value) {
            if (in_array($key, ['created_at_from', 'created_at_to', 'updated_at_from', 'updated_at_to'])) {
                $operator = str_contains($key, '_from') ? '>=' : '<=';
                $query->whereDate(str_replace(['_from', '_to'], '', $key), $operator, $value);
            } elseif ($key === 'name') {
                $query->where('name', 'like', "%$value%");
            }
        }

        return $query->paginate($perPage);
    }

    public function getById(int $id): ApprovalLevel
    {
        return ApprovalLevel::findOrFail($id);
    }

    public function create(array $data): ApprovalLevel
    {
        Log::info('Creating new approval level record', ['data' => $data]);

        return DB::transaction(function () use ($data) {
            $validatedData = $this->validateApprovalLevel($data);
            return ApprovalLevel::create($validatedData);
        });
    }

    public function update(array $data): ApprovalLevel
    {
        $id = $data['id'] ?? null;
        if (!$id) {
            throw new \InvalidArgumentException('ID is required for update');
        }

        Log::info('Updating approval level record', ['id' => $id, 'data' => $data]);

        return DB::transaction(function () use ($id, $data) {
            $approvalLevel = $this->getById($id);
            $validatedData = $this->validateApprovalLevel($data, true);
            $approvalLevel->update($validatedData);
            return $approvalLevel;
        });
    }
}
