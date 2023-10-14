const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api =supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');


beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs)
});


//Test for API
describe('root path API calls', () => {
    
    test('there are 3 blogs currently', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body).toHaveLength(3);
    });
    

    test('a new blog can be posted', async() => {
        const newBlog = {
            title: 'Testing posting to a bad blog website, an exercise in futility',
            author: 'Tester#69',
            url: 'www.whydoiworkhere.com',
            likes: 2
        };
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogs = await helper.blogsInDb();
        const titles = blogs.map(blog => blog.title);

        expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
        expect(titles).toContain('Testing posting to a bad blog website, an exercise in futility');
    });
});


describe('deleting posts', () => {
    test('remove last blog in posts', async () => {
        const response = await api.get('/api/blogs');
        const finalBlog = response.body[response.body.length -1];

        await api
            .delete(`/api/blogs/${finalBlog._id}`)
            .expect(204);
    });
});


describe('updating a post', () => {
    test('update first blogs author', async () => {
        const blogs = await api.get('/api/blogs');
        const firstBlogId = blogs.body[0]._id
        const newTitle = {title: 'This is an updated title'};


        await api
            .put(`/api/blogs/${firstBlogId}`)
            .send(newTitle)
            .expect(200)

        const newBlogs = await helper.blogsInDb();
        const title = newBlogs[0].title;
        expect(title === 'This is an updated title');
    });
});


afterAll(async () => {
    await Blog.deleteMany({})
    mongoose.connection.close();
});