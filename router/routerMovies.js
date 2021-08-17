const express = require('express')
const api = express.Router()
const moviesCtrl = require('../controller/reqHttp')

api.get('/', moviesCtrl.setNewMovies)

api.get('/popular', moviesCtrl.setPopularMovies)

api.get('/search')

api.get('/nowPlaying')

api.get('/movie/:id')

module.exports = api