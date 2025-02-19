<?php

namespace Database\Factories;

use App\Models\ApprovalLevel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ApprovalLevel>
 */
class ApprovalLevelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(ApprovalLevel::APPROVAL_LEVELS),
            'description' => fake()->sentence(),
        ];
    }
}
