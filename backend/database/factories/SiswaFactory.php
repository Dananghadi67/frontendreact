<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SiswaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nama' => $this->faker->name(),
            'alamat' => $this->faker->streetAddress(),
            'kota' => $this->faker->city(),
            'provinsi' => $this->faker->state(),
            'email' => $this->faker->email(),
        ];
    }
}
