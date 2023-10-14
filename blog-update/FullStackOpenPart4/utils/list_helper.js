const {listWithOneBlog, listWithManyBlogs} = require('../tests/testBlogs');

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    if (blogs.length === 1) {
        return blogs[0]['likes'];
    }

    const sumOfLikes = blogs.reduce(
        (acc, currentBlog) => {
            return acc + currentBlog.likes;
        }, 0);

    return sumOfLikes;
};

const favoriteBlog = (blogs) => {
    const pluckObject = (blog) => {
        const {title, author, likes} = blog[0];
        return {title, author, likes};
    };

    if (blogs.length === 1) {
        return pluckObject(blogs);
    }

    const maxLikes = Math.max(...blogs.map(blog => blog.likes));
    const mostLikedBlog = blogs.filter(blog => blog.likes === maxLikes);
    return pluckObject(mostLikedBlog);
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
};