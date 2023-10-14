import { useState } from 'react'

const Blog = ({ blog, addLike, showRemove, removeBlog }) => {
  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const likeBlog = () => {
    addLike(blog)
  }

  const deleteBlog = () => {
    removeBlog(blog)
  }


  return (
    <div className='blog'>

      {!showAll &&
      <div className="blog_head">
        <h3>{blog.title}</h3>
        <p>{blog.author}</p>
        <button onClick={toggleShowAll}>Show more</button>
      </div>
      }

      {showAll && (
        <div>
          <div className="blog_head">
            <h3>{blog.title}</h3>
            <p>{blog.author}</p>
            <button onClick={toggleShowAll}>Hide</button>
          </div>
          <p>{blog.url}</p>

          <div className='blog_likes'>
            {blog.likes === 0 &&
            <p>Be the first to like this post!</p>
            }

            {blog.likes > 0 &&
            <p>Likes {blog.likes}</p>
            }
            <button onClick={likeBlog}>Like</button>
          </div>

          <p>{blog.user.username}</p>

          {showRemove === true &&
          <button onClick={deleteBlog}>Remove</button>
          }
        </div>
      )}

    </div>
  )
}

export default Blog