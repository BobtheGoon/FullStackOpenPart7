import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog/>', () => {
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

  test('renders blog title', () => {
    render(<Blog blog={blog}></Blog>)
    screen.getByText('Testing blog')
  })

  test('likes and url are displayed when show more is clicked', async() => {
    const mockHandler = jest.fn()
    render(<Blog blog={blog}></Blog>)

    const user = userEvent.setup()
    const button = screen.getByText('Show more')
    await user.click(button)

    screen.getByText('Jest')
    screen.getByText('JestTest.com')
    screen.getByText('Be the first to like this post!')    
  })

  test('like button eventhandler is called twice when button is clicked twice', async() => {
    const mockHandler = jest.fn()
    render(<Blog blog={blog} addLike={mockHandler}></Blog>)

    const user = userEvent.setup()
    const show_button = screen.getByText('Show more')
    await user.click(show_button)

    const like_button = screen.getByText('Like')
    await user.click(like_button)
    await user.click(like_button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})