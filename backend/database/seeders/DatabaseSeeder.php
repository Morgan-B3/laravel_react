<?php
namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Image;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(10)->create();

        $filesInFolder = scandir('public/images/');   
    
        for($i=2; $i<count($filesInFolder); $i++){
            $file = pathinfo($filesInFolder[$i]);
            Image::create(['url'=>$file['basename']]);
            
        }
                    
           
    } 

    // \App\Models\User::factory()->create([
    //     'name' => 'Test User',
    //     'email' => 'test@example.com',
    // ]);
}
