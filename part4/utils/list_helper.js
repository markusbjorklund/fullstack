const _ = require('lodash')
const blog = require('../models/blog')
const { get } = require('mongoose')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return (
    blogs.map(blog => blog.likes)
      .reduce((total, likes) => total + likes, 0)
  )
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const object = blogs.find(blog => blog.likes === Math.max(...likes))

  if (typeof object === 'undefined') return 0

  delete object._id
  delete object.__v
  delete object.url

  return object
}

const mostBlogs = (blogs) => {
  const blogKing = _.maxBy(blogs, 'blogs')

  if (blogs.length === 0) return 0

  if (blogs.length === 1) return _(blogs)
    .countBy('author')
    .map((amount, name) => ({ author: name, blogs: amount }))
    .reduce((prev, current) => (prev.blogs > current.blogs) ? prev : current)

  return blogKing
}

const mostLikes = blogs => {
  if (blogs.length === 0) return 0

  const getMostLikes = (bloglist) => bloglist
    .reduce(({ totalsum, most }, { likes, author }) => {
      totalsum[author] = likes = (totalsum[author] || 0) + likes;
      if (likes > most.likes) most = { author, likes }
      return { totalsum, most }
    }, { totalsum: {}, most: { likes: 0 } })
    .most;

  return getMostLikes(blogs)
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }