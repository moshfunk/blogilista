const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        })
})
blogsRouter.post('/', (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then(res => {
            res.status(201).json(res)
        })
})

module.exports = blogsRouter