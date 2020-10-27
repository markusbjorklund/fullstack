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

  console.log(likes)

  const object = blogs.find(blog => blog.likes === Math.max(...likes))

  if (typeof object === 'undefined') return 0

  console.log(object)

  delete object._id
  delete object.__v
  delete object.url

  console.log(object)
  
  return object
}

module.exports = { dummy, totalLikes, favoriteBlog }