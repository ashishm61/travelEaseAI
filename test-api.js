import fetch from 'node-fetch';

async function testAPI() {
    try {
        const testUser = {
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane.smith@example.com',
            nationality: 'UK',
            phone_number: '+44123456789',
            password: 'TestPassword123!'
        };

        console.log('Testing registration API...');
        const response = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testUser)
        });

        const data = await response.json();
        console.log('\nAPI Response:', {
            status: response.status,
            data: data
        });

        // Test duplicate registration
        console.log('\nTesting duplicate registration...');
        const duplicateResponse = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testUser)
        });

        const duplicateData = await duplicateResponse.json();
        console.log('Duplicate Registration Response:', {
            status: duplicateResponse.status,
            data: duplicateData
        });

    } catch (error) {
        console.error('Error testing API:', error);
    }
}

testAPI();
