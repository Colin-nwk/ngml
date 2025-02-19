<?php

namespace Database\Seeders;

use App\Models\ApprovalLevel;
use App\Models\Department;
use App\Models\Designation;
use App\Models\Location;
use App\Models\Role;
use App\Models\Unit;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $roleModels = [];
        foreach (Role::$roles as $role) {
            $roleModels[] = Role::factory()->create([
                'name' => $role,
                'description' => $role,
            ]);
        }
        $department = Department::factory()->create([
            'name' => 'Test Department',
        ]);
        $location = Location::factory()->create([
            'location' => 'Test Location',
        ]);
        $designation = Designation::factory()->create();
        $unit = Unit::factory()->create([
            'department_id' => $department->id,
        ]);
        $approvalLevels = [];
        foreach (ApprovalLevel::$approvalLevels as $level) {
            $approvalLevels[] = ApprovalLevel::factory()->create([
                'name' => $level,
            ]);
        }
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
            'role_id' => $roleModels[0]->id,
            'department_id' => $department->id,
            'location_id' => $location->id,
            'designation_id' => $designation->id,
            'unit_id' => $unit->id,
            'approval_level_id' => $approvalLevels[0]->id,
            'status' => 1
        ]);
    }
}
