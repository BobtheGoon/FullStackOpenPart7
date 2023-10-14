const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');


//GET
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1});
    response.json(blogs);
});


//POST
blogsRouter.post('/', async (request, response) => {
    const body = request.body;

    if (request.userId === null) {
        return response.status(401).json({ error: 'token missing or invalid' });
      }

    const user = await User.findById(request.userId);
    
    //Create new mongoose Blog object and add user as its owner
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: 0,
        user: user._id
    });

    //Save blog to database
    const savedBlog = await blog.save();
    
    //Add new blogs id to users blog field
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
});


//PUT
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body;
    
    const updatedBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    };

    const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog);
    response.status(200).json(blog)
})


//DELETE
blogsRouter.delete('/:id', async (request, response) => {
    const blogId = request.params.id;
    const user = request.userId;


    //Find blog from db
    const blog = await Blog.findById(blogId);


    //Check if blog has no owner (blog.user=undefined) or the user making the request is not the owner of the blog
    if (blog.user === undefined || user === null || blog.user.toString() !== user) {
        response.status(401).json({error: 'action denied'});
      }
    
    //if all good, find blog and remove from database
    else if (blog.user.toString() === user.toString()) {
        await Blog.findByIdAndRemove(blogId);
        response.status(204).end();
    };
});

module.exports = blogsRouter;