const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');


const initialBlogs = [
    {
        title: 'All your computers are belong to us',
        author: 'Martin Memer',
        url: 'www.evil.com',
        likes: 3,
    },
    {
        title: 'How to become a FullStackBob',
        author: 'Bobrosky Ross',
        url: 'www.twitch.com/bobross',
        likes: 18,
    },
    {
        title: 'Crime dont pay, deving does',
        author: 'FullStacks Bob',
        url: 'www.howtomakemoney.com',
        likes:1,
    },
];


const hashPasswords = async () => {
	const password1 = await bcrypt.hash('bananaynay', 10);
	const password2 = await bcrypt.hash('bobross!', 10);
	const password3 = await bcrypt.hash('kimmokinkku123', 10);

	return [password1, password2, password3]
};

const initialUsers = async () =>{
	const passwords = await hashPasswords()

	const users = [
		{
		username: 'GobtheBoon',
		name: 'Martin Memer',
		passwordHash: passwords[0]
		},
		{
		username: 'FullStackBob',
		name: 'Bobrosky Ross',
		passwordHash: passwords[1]
		},
		{
		username: 'FullStacksKimmo',
		name: 'Kimmo',
		passwordHash: passwords[2]
		},
	];

	return users
}


const usersInDb = async () => {
	users = await User.find({});
	return users.map(user => user.toJSON());
};

const blogsInDb = async () => {
    blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
}

module.exports = {
  initialUsers, initialBlogs, usersInDb, blogsInDb
}