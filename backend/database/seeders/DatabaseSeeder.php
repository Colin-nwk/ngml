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
        $this->command->info('Starting DatabaseSeeder...');
        $roleModels = [];
        foreach (Role::ROLES as $role) {
            $roleModels[] = Role::factory()->create([
                'name' => $role,
                'description' => $role,
            ]);
        }

        $approvalLevels = [];
        foreach (ApprovalLevel::APPROVAL_LEVELS as $approvalLevel) {
            $approvalLevels[] = ApprovalLevel::factory()->create([
                'name' => $approvalLevel,
                'description' => $approvalLevel,
            ]);
        }

        // MAJOR SEEDS
        $allLocations = array_merge(...array_values(Location::LOCATIONS_BY_ZONE));
        $locations = [];
        foreach ($allLocations as $location) {
            $locations[] = Location::factory()->create([
                'location' => $location,
                'zone' => $this->getZoneByLocation($location),
                'state' => Location::LOCATION_TO_STATE[$location],
            ]);
        }

        $departments = [];
        foreach (Department::DEPARTMENTS as $department) {
            $departments[] = Department::factory()->create([
                'name' => $department,
                'description' => $department,
            ]);
        }

        $designations = [];
        foreach (Designation::DESIGNATIONS as $designation) {
            $designations[] = Designation::factory()->create([
                'role' => $designation,
                'description' => $department,
                'level' => null,
            ]);
        }

        $units = [];
        foreach (Unit::UNITS as $unit) {
            $units[] = Unit::factory()->create([
                'name' => $unit,
                'description' => $unit,
            ]);
        }

        // Test User for Authentication {Backend API token}
        if (app()->environment('local')) {
            if ($this->command->confirm('Do you want a test user?', true)) {
                $user = User::factory()->create([
                    'name' => 'Test User',
                    'email' => 'tester@example.com',
                    'password' => Hash::make('password'),
                    'department_id' => $departments[0]->id,
                    'location_id' => $locations[0]->id,
                    'designation_id' => $designations[0]->id,
                    'unit_id' => $units[0]->id,
                    'role_id' => $roleModels[0]->id,
                    'approval_level_id' => $approvalLevels[0]->id,
                    'status' => 1
                ]);
                $apiToken = $user->createToken('API Token')->plainTextToken;
                $this->command->info("API Token: $apiToken");
            }
        }
        $this->command->newLine();
        $this->command->info('DatabaseSeeder completed successfully!');
    }

    private function getZoneByLocation($location)
    {
        foreach (Location::LOCATIONS_BY_ZONE as $key => $locations) {
            if (in_array($location, $locations)) {
                return $key;
            }
        }
        return null;
    }
}
