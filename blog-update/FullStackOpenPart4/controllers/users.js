const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { json } = require('express')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1});
    response.json(users);
});

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body;

    //Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({
        error: 'username already in use'
      })
    };

    //Check that username and password length is valid
    if (username.length < 3 || password.length < 3) {
        return response.status(403).json({
            error: 'username or password not long enough'
        });
    };

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
});

module.exports = usersRouter