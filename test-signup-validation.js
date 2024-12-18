import fetch from 'node-fetch';

async function testSignupValidation() {
    const testCases = [
        {
            name: 'Missing Required Fields',
            data: {
                first_name: 'Test',
                // missing last_name
                email: 'test@example.com',
                password: 'Password123!'
            },
            expectedStatus: 400
        },
        {
            name: 'Invalid Email Format',
            data: {
                first_name: 'Test',
                last_name: 'User',
                email: 'invalid-email',
                nationality: 'US',
                phone_number: '+1234567890',
                password: 'Password123!'
            },
            expectedStatus: 400
        },
        {
            name: 'Weak Password',
            data: {
                first_name: 'Test',
                last_name: 'User',
                email: 'test.weak@example.com',
                nationality: 'US',
                phone_number: '+1234567890',
                password: 'weak'
            },
            expectedStatus: 400
        },
        {
            name: 'Invalid Phone Number',
            data: {
                first_name: 'Test',
                last_name: 'User',
                email: 'test.phone@example.com',
                nationality: 'US',
                phone_number: '123', // invalid format
                password: 'Password123!'
            },
            expectedStatus: 400
        },
        {
            name: 'Valid Registration',
            data: {
                first_name: 'Valid',
                last_name: 'User',
                email: 'valid.user@example.com',
                nationality: 'UK',
                phone_number: '+44987654321',
                password: 'ValidPass123!'
            },
            expectedStatus: 201
        }
    ];

    console.log('Starting Signup Validation Tests...\n');

    for (const testCase of testCases) {
        try {
            console.log(`Testing: ${testCase.name}`);
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testCase.data)
            });

            const data = await response.json();
            const passed = response.status === testCase.expectedStatus;

            console.log('Status:', response.status);
            console.log('Response:', data);
            console.log('Test Result:', passed ? '✓ PASSED' : '✗ FAILED');
            console.log('------------------------\n');

        } catch (error) {
            console.error(`Error in test case "${testCase.name}":`, error);
        }
    }
}

testSignupValidation();
