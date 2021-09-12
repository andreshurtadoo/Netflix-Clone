const express = require('express')
const api = express.Router()
const moviesCtrl = require('../controller/getAllMovies')

api.get('/', moviesCtrl.setAllMovies)

api.get('/movie/:id([0-9]{6})?', moviesCtrl.setPopularMovies)

api.get('/tv/:id?', moviesCtrl.setPopularTv)

api.get('/search', moviesCtrl.search)

module.exports = api