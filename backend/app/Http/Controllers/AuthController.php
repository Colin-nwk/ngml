<?php

namespace App\Http\Controllers;

use App\Jobs\User\UserCreated;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;
use VladimirYuldashev\LaravelQueueRabbitMQ\Queue\Connectors\RabbitMQConnector;

class AuthController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/auth/initialize",
     *     summary="Get Microsoft OAuth redirect URL",
     *     description="This endpoint returns the Microsoft OAuth login page URL for authentication.",
     *     tags={"Authentication"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response with redirect URL",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="status",
     *                 type="string",
     *                 example="success"
     *             ),
     *             @OA\Property(
     *                 property="url",
     *                 type="string",
     *                 example="https://login.microsoftonline.com/..."
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function initialize(Request $request)
    {
        try {
            $redirect = Socialite::driver('azure')->stateless()->redirect();
            $url = $redirect->getTargetUrl();

            return response()->json([
                'status' => 'success',
                'url' => $url,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unable to generate the Microsoft OAuth URL.',
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/callback",
     *     summary="Handle Microsoft OAuth callback",
     *     description="Handles the callback from Microsoft after user authentication. Registers a new user or logs in an existing user based on their Microsoft account information.",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string", description="Authorization code from Microsoft", example="ABC123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="User registered or logged in successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="User registered successfully"),
     *             @OA\Property(property="user", type="object",
     *                 @OA\Property(property="id", type="integer", example=1, description="Unique identifier for the user"),
     *                 @OA\Property(property="name", type="string", example="John Doe", description="User's full name"),
     *                 @OA\Property(property="email", type="string", format="email", example="john@example.com", description="User's email address"),
     *                 @OA\Property(property="azure_id", type="string", example="abc1234", description="User's unique Microsoft Azure ID"),
     *                 @OA\Property(property="status", type="integer", example=1, description="Status of the user (1 for active)")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="An error occurred")
     *         )
     *     )
     * )
     */
    public function callback(Request $request)
    {
        try {
            $code = $request->input('code');

            $tokenResponse = Socialite::driver('azure')->stateless()->getAccessTokenResponse($code);
            $tmpUser = Socialite::driver('azure')->stateless()->userFromToken($tokenResponse['access_token']);

            $password = Hash::make($tmpUser->id);
            $user = User::firstOrCreate([
                'email' => $tmpUser->email,
            ], [
                'name' => $tmpUser->name,
                'email' => $tmpUser->email,
                'azure_id' => $tmpUser->id,
                'password' => $password,
                'status' => 2,
            ]);

            if(!$user)
                return response()->json([
                    'status' => 'error',
                    'message' => 'User not found',
                ]);

            $access_token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'message' => 'User registered successfully',
                'user' => $user,
                'access_token' => $access_token,
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
