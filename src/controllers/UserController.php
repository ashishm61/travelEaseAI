<?php
namespace Controllers;

use Models\UserLogin;
use Validators\UserValidator;

class UserController {
    private UserLogin $userModel;
    
    public function __construct(UserLogin $userModel) {
        $this->userModel = $userModel;
    }
    
    public function register(array $data): array {
        try {
            // Validate input
            $emailErrors = UserValidator::validateEmail($data['email'] ?? '');
            $passwordErrors = UserValidator::validatePassword($data['password'] ?? '');
            
            $errors = array_merge($emailErrors, $passwordErrors);
            
            if (!empty($errors)) {
                return [
                    'success' => false,
                    'errors' => $errors
                ];
            }
            
            // Check if email already exists
            if ($this->userModel->emailExists($data['email'])) {
                return [
                    'success' => false,
                    'errors' => ['Email already registered']
                ];
            }
            
            // Create user
            $userId = $this->userModel->createUser(
                $data['email'],
                $data['password']
            );
            
            return [
                'success' => true,
                'message' => 'User registered successfully',
                'userId' => $userId
            ];
            
        } catch (\PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return [
                'success' => false,
                'errors' => ['An internal error occurred']
            ];
        } catch (\Exception $e) {
            error_log("General error: " . $e->getMessage());
            return [
                'success' => false,
                'errors' => ['An unexpected error occurred']
            ];
        }
    }
}