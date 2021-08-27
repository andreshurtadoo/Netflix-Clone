const express = require('express')
const api = express.Router()
const moviesCtrl = require('../controller/getAllMovies')

api.get('/movies', moviesCtrl.setAllMovies)

api.get('/popular', moviesCtrl.setPopularMovies)

api.get('/search', moviesCtrl.search)

api.get('/nowPlaying', moviesCtrl.setNowPlaying)

module.exports = api