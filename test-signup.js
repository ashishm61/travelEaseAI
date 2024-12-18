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

        // Sample signup data
        const testUser = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe.test@example.com',
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

        console.log('\nRetrieved user:', rows[0]);

        // Test duplicate email
        try {
            await pool.execute(
                'INSERT INTO users (first_name, last_name, email, nationality, phone_number, password_hash) VALUES (?, ?, ?, ?, ?, ?)',
                [testUser.first_name, testUser.last_name, testUser.email, testUser.nationality, testUser.phone_number, hashedPassword]
            );
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                console.log('\n✓ Duplicate email check passed: Email uniqueness is enforced');
            } else {
                throw error;
            }
        }

        // Verify password hashing
        const [userWithPassword] = await pool.execute(
            'SELECT password_hash FROM users WHERE id = ?',
            [result.insertId]
        );

        const passwordMatch = await bcrypt.compare(testUser.password, userWithPassword[0].password_hash);
        console.log('\n✓ Password hashing verification:', passwordMatch ? 'Passed' : 'Failed');

    } catch (error) {
        console.error('✗ Error:', error.message);
        if (error.code === 'ER_DUP_ENTRY') {
            console.log('Note: This email is already registered');
        }
    } finally {
        if (pool) {
            await pool.end();
            console.log('\nDatabase connection closed');
        }
    }
}

testSignup();
