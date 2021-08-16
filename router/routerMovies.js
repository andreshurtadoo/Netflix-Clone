const express = require('express')
const api = express.Router()
const moviesCtrl = require('../controller/reqHttp')

api.get('/', moviesCtrl.setMovies)

api.get('/popular', moviesCtrl.popular)

api.get('/search', (req, res) => {
    res.status(200).render('search', {
       title:'Search any movie'
    })
})

api.get('/premieres', (req, res) => {
    res.status(200).render('premieres', {
        title:'Latest movies'
    })
})

api.get('/movie/:id', (req, res) => {
    const id = req.params.id
    res.status(200).render('movie', {
        title:'Any movie',
        id
    })
})

module.exports = api