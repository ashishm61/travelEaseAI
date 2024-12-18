<?php
namespace Models;

class UserLogin {
    private \PDO $db;
    
    public function __construct(\PDO $db) {
        $this->db = $db;
    }
    
    public function createUser(string $email, string $password): int {
        $hashedPassword = password_hash($password, PASSWORD_ARGON2ID, [
            'memory_cost' => 65536,
            'time_cost' => 4,
            'threads' => 3
        ]);
        
        $stmt = $this->db->prepare(
            "INSERT INTO userLogin (email, password) VALUES (:email, :password)"
        );
        
        $stmt->execute([
            'email' => $email,
            'password' => $hashedPassword
        ]);
        
        return (int) $this->db->lastInsertId();
    }
    
    public function emailExists(string $email): bool {
        $stmt = $this->db->prepare(
            "SELECT 1 FROM userLogin WHERE email = :email LIMIT 1"
        );
        
        $stmt->execute(['email' => $email]);
        return (bool) $stmt->fetch();
    }
}