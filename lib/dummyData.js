import { User } from '../models/User.js';
import { Challenge } from '../models/Challenge.js';
import { Submission } from '../models/Submission.js';


//create from AI
const createDummyData = async () => {
    try {
        const userCount = await User.countDocuments();
        if (userCount > 0) {
            console.log('Dummy data already exists');
            return;
        }

        const manager = await User.create({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'hashedPassword123',
            role: 'Manager'
        });

        const coder = await User.create({
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            password: 'hashedPassword456',
            role: 'Coder',
            description: 'Passionate about coding and problem-solving',
            score: 100
        });

        const challenge = await Challenge.create({
            title: 'Fibonacci Sequence',
            category: 'Algorithms',
            description: 'Write a function to generate the nth Fibonacci number',
            difficulty: 'Moderate',
            manager: manager._id,
            code: {
                functionName: 'fibonacci',
                codeContent: 'function fibonacci(n) {\n  // Your code here\n}',
                language: 'javascript',
                inputDefinitions: [{
                    name: 'n',
                    type: 'number'
                }]
            },
            testCases: [{
                weight: 0.5,
                functionInputs: [{
                    name: 'n',
                    value: 5
                }],
                expectedOutput: 5
            }]
        });

        await Submission.create({
            challenge: challenge._id,
            coder: coder._id,
            submittedCode: 'function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n-1) + fibonacci(n-2);\n}',
            passed: true,
            score: 100
        });

        console.log('Dummy data created successfully');
    } catch (error) {
        console.error('Error creating dummy data:', error);
    }
};

export default createDummyData;