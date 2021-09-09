const express = require('express')
const api = express.Router()
const moviesCtrl = require('../controller/getAllMovies')
const oneMovieCtrl = require('../controller/getOneMovie')

api.get('/', moviesCtrl.setAllMovies)

api.get('/nowPlaying', moviesCtrl.setNowPlaying)

api.get('/movie/:id([0-9]{6})?', moviesCtrl.setPopularMovies)

api.get('/search', moviesCtrl.search)

// api.get('/:id?', oneMovieCtrl.setOneMovie)

module.exports = api