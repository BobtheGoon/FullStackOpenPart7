const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api =supertest(app);
const User = require('../models/user');
const helper = require('./test_helper.js')
const bcrypt = require('bcrypt');


beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(await helper.initialUsers())
});


describe('Getting users', () => {
    test('There are 3 initial users', async () => {
        const response = await api.get('/api/users');
        expect(response.body).toHaveLength(3);
    });
});


describe('Adding users', () => {
    test('New user can be added', async () => {
        initialUsers = await helper.initialUsers()

        newUser = {
            username: 'TestSubject',
            name: 'Test McTested',
            password: 'tEsTeD_LiKe_USADA'
        };
        await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/);

        //Check that users in db has increased
        const usersInDb = await helper.usersInDb()
        expect(usersInDb).toHaveLength(initialUsers.length + 1);

        //Check that new user is in db
        const names = usersInDb.map(user => user.name);
        expect(names).toContain('Test McTested');
    });


    test('Invalid user or password cannot be added', async () => {
        invalidUser = {
            username: 'T2',
            name: 'Arnold Exterminator',
            password: 'p'
        };

        const result = await api
                        .post('/api/users')
                        .send(invalidUser)
                        .expect(403)
                        .expect('Content-Type', /application\/json/);
                        
        expect(result.body.error).toContain('username or password not long enough')
    });


    test('Create root user with password', async () => {
        const passwordHash = await bcrypt.hash('admin', 10);

        const root = {
            username: 'root',
            name: 'Admin',
            passwordHash: passwordHash
        };

        //Insert root user to database
        await User.insertMany([root]);

        //Check that database containes root user
        const usersInDb = await helper.usersInDb()
        const usernames = usersInDb.map(user => user.username);
        expect(usernames).toContain('root');
    });
});


afterAll(() => {
    mongoose.connection.close();
});