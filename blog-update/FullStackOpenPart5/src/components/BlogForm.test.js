import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
  const blog = {
    title: 'Testing blog',
    author: 'Jest testing',
    url: 'JestTest.com',
    likes: 0,
    user: {
      username: 'Jest',
      name: 'Jest Tester',
    }
  }

  test('BlogForm calls callback function with correct props', async() => {
    const user = userEvent.setup()
    const addBlog = jest.fn()
    render(<BlogForm addBlog={addBlog}/>)

    const title_input = screen.getByLabelText(('Title'))
    const author_input = screen.getByLabelText(('Author'))
    const url_input = screen.getByLabelText(('URL'))
    const submit_btn = screen.getByText('Create')

    await user.type(title_input, blog.title)
    await user.type(author_input, blog.author)
    await user.type(url_input, blog.url)
    await user.click(submit_btn)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe(blog.title)
    expect(addBlog.mock.calls[0][0].author).toBe(blog.author)
    expect(addBlog.mock.calls[0][0].url).toBe(blog.url)
  })
})