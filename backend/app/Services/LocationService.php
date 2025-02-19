<?php

namespace App\Services;

use App\Models\Location;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class LocationService
{
    public function validateLocation(array $data, bool $isUpdate = false): array
    {
        $rules = [
            'location' => ($isUpdate ? 'sometimes|' : 'required|') . 'string|max:255',
            'zone' => ($isUpdate ? 'sometimes|' : 'required|') . 'string|max:255',
            'state' => ($isUpdate ? 'sometimes|' : 'required|') . 'string|max:255',
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
        $query = Location::query();

        foreach ($filters as $key => $value) {
            if (in_array($key, ['created_at_from', 'created_at_to', 'updated_at_from', 'updated_at_to'])) {
                $operator = str_contains($key, '_from') ? '>=' : '<=';
                $query->whereDate(str_replace(['_from', '_to'], '', $key), $operator, $value);
            } elseif (in_array($key, ['location', 'zone', 'state', 'status'])) {
                $query->where($key, $value);
            }
        }

        return $query->paginate($perPage);
    }

    public function getById(int $id): Location
    {
        return Location::findOrFail($id);
    }

    public function create(array $data): Location
    {
        Log::info('Creating new location record', ['data' => $data]);

        return DB::transaction(function () use ($data) {
            $validatedData = $this->validateLocation($data);
            return Location::create($validatedData);
        });
    }

    public function update(array $data): Location
    {
        $id = $data['id'] ?? null;
        if (!$id) {
            throw new \InvalidArgumentException('ID is required for update');
        }

        Log::info('Updating location record', ['id' => $id, 'data' => $data]);

        return DB::transaction(function () use ($id, $data) {
            $location = $this->getById($id);
            $validatedData = $this->validateLocation($data, true);
            $location->update($validatedData);
            return $location;
        });
    }
}
