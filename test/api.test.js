import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index.js';
import User from '../models/User.js';
import Challenge from '../models/Challenge.js';
import Submission from '../models/Submission.js';

let token;

connectDB(async () => {
    await mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Insert dummy data
    const coder = await User.create({
        username: 'testCoder',
        password: 'testPassword',
        role: 'coder',
    });

    const manager = await User.create({
        username: 'testManager',
        password: 'testPassword',
        role: 'manager',
    });

    const challenge1 = await Challenge.create({
        title: 'Challenge 1',
        description: 'Description 1',
        createdBy: manager._id,
    });

    const challenge2 = await Challenge.create({
        title: 'Challenge 2',
        description: 'Description 2',
        createdBy: manager._id,
    });

    await Submission.create({
        challengeId: challenge1._id,
        coderId: coder._id,
        result: 'pass',
    });

    await Submission.create({
        challengeId: challenge2._id,
        coderId: coder._id,
        result: 'fail',
    });

    // Login to get a token
    const response = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testCoder', password: 'testPassword' });

    token = response.body.token;
});

removeData(async () => {
    // Cleaning up test data
    await User.deleteMany({});
    await Challenge.deleteMany({});
    await Submission.deleteMany({});

    // Closing the database connection
    await mongoose.connection.close();
});

// Test cases
test('should return 401 when user is not logged in', async () => {
    const response = await request(app).get('/api/challenges');
    expect(response.statusCode).toBe(401);
});

test('should return 401 when invalid token is passed', async () => {
    const response = await request(app)
        .get('/api/challenges')
        .set('Authorization', 'Bearer invalidToken');
    expect(response.statusCode).toBe(401);
});

test('should return a valid token on successful login', async () => {
    const response = await request(app)
        .post('/api/auth/login')
        .send({ username: 'testCoder', password: 'testPassword' });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
});

test('should return all challenges for the coder after login', async () => {
    const response = await request(app)
        .get('/api/challenges')
        .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
});

test('should have one completed and one attempted challenge', async () => {
    const response = await request(app)
        .get('/api/challenges')
        .set('Authorization', `Bearer ${token}`);
    const challenges = response.body;
    const completed = challenges.filter((c) => c.status === 'completed');
    const attempted = challenges.filter((c) => c.status === 'attempted');
    expect(completed.length).toBe(1);
    expect(attempted.length).toBe(1);
});