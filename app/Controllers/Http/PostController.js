'use strict'

const Post = use('App/Models/Post')

const { validate } = use('Validator')

class PostController {
  async index({ view }) {
    const posts = await Post.all();

    return view.render('posts.index', {
      title: 'Latest Posts',
      posts: posts.toJSON()
    })
  }

  async details({ params, view }) {
    const post = await Post.find(params.id)

    return view.render('posts.details', {
      post
    })
  }

  async add({ view }) {
    return view.render('posts.add')
  }

  async store({ request, response, session }) {
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:255',
      body: 'required|min:3'
    })

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back') // reload the current page (the form)
    }

    const post = new Post();

    post.title = request.input('title');
    post.body = request.input('body');

    await post.save();

    session.flash({ notification: 'Post added!' });

    return response.redirect('/posts');
  }

  async edit({ view, params }) {
    const post = await Post.find(params.id)

    return view.render('posts.edit', {
      post
    })
  }

  async update({ params, request, response, session }) {
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:255',
      body: 'required|min:3'
    })

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back') // reload the current page (the form)
    }

    const post = await Post.find(params.id)

    post.title = request.input('title')
    post.body = request.input('body')

    await post.save()

    session.flash({ notificaiton: 'Post updated successfully!' })

    return response.redirect('/posts')
  }

  async destroy({ params, session, response }) {
    const post = await Post.find(params.id)

    await post.delete()

    session.flash({ notificaiton: 'Post deleted successfully!' })

    return response.redirect('/posts')
  }
}

module.exports = PostController
