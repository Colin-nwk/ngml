<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'role_id' => $this->role_id,
            'department_id' => $this->department_id,
            'location_id' => $this->location_id,
            'designation_id' => $this->designation_id,
            'unit_id' => $this->unit_id,
            'approval_level_id' => $this->approval_level_id,
            'name' => $this->name,
            'email' => $this->email,
            'status' => $this->status,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
            'role' => new RoleResource($this->whenLoaded('role')),
            'department' => new DepartmentResource($this->whenLoaded('department')),
            'location' => new LocationResource($this->whenLoaded('location')),
            'designation' => new DesignationResource($this->whenLoaded('designation')),
            'unit' => new UnitResource($this->whenLoaded('unit')),
            'approval_level' => new ApprovalLevelResource($this->whenLoaded('approval_level'))
        ];
    }
}
