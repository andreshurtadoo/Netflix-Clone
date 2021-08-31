const express = require('express')
const api = express.Router()
const moviesCtrl = require('../controller/getAllMovies')
const oneMovieCtrl = require('../controller/getOneMovie')

api.get('/movies', moviesCtrl.setAllMovies)

api.get('/nowPlaying', moviesCtrl.setNowPlaying)

api.get('/popular', moviesCtrl.setPopularMovies)

api.get('/search', moviesCtrl.search)

api.get('/:id?', oneMovieCtrl.setOneMovie)

module.exports = api