'use strict'

class PostController {
  async index({ view }) {
    const posts = [
      { title: 'Post One', body: 'This is post one' },
      { title: 'Post Two', body: 'This is post two' },
      { title: 'Post Three', body: 'This is post three' },
      { title: 'Post Four', body: 'This is post four' }
    ]

    return view.render('posts.index', {
      title: 'Latest Posts',
      posts
    })
  }
}

module.exports = PostController
