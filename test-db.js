import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function testSignup() {
    let pool;
    try {
        console.log('Creating database connection...');
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        // Test the connection
        await pool.getConnection();
        console.log('✓ Database connection successful!');

        // Check table structure
        const [tables] = await pool.execute('SHOW TABLES');
        console.log('Tables in database:', tables);

        const [columns] = await pool.execute('SHOW COLUMNS FROM users');
        console.log('\nColumns in users table:');
        columns.forEach(col => {
            console.log(`${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : ''} ${col.Key === 'PRI' ? 'PRIMARY KEY' : ''}`);
        });

        // First, create the users table if it doesn't exist
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                nationality VARCHAR(255) NOT NULL,
                phone_number VARCHAR(255) NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX email_idx (email)
            )
        `;
        
        await pool.execute(createTableQuery);
        console.log('✓ Users table ready');

        // Sample signup data
        const testUser = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            nationality: 'US',
            phone_number: '+1234567890',
            password: 'TestPassword123!'
        };

        // Hash the password
        const hashedPassword = await bcrypt.hash(testUser.password, 10);

        // Insert user into database
        const [result] = await pool.execute(
            'INSERT INTO users (first_name, last_name, email, nationality, phone_number, password_hash) VALUES (?, ?, ?, ?, ?, ?)',
            [testUser.first_name, testUser.last_name, testUser.email, testUser.nationality, testUser.phone_number, hashedPassword]
        );

        console.log('\n✓ User successfully inserted!');
        console.log('User ID:', result.insertId);

        // Verify the user was inserted
        const [rows] = await pool.execute(
            'SELECT id, first_name, last_name, email, nationality, phone_number, created_at FROM users WHERE id = ?',
            [result.insertId]
        );

        console.log('Retrieved user:', rows[0]);
    } catch (error) {
        console.error('✗ Error:', error.message);
        if (error.code === 'ER_DUP_ENTRY') {
            console.log('Note: This email is already registered');
        }
    } finally {
        if (pool) {
            await pool.end();
            console.log('Database connection closed');
        }
        process.exit(0);
    }
}

testSignup();
