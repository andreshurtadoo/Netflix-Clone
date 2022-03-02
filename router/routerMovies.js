const express = require('express')
const api = express.Router()
const moviesCtrl = require('../controller/getAllMovies')

api.get('/', moviesCtrl.setAllMovies)

// acomodar variable de entorno

// ruta de pelicula
api.get('/movie/:id([0-9]{6})?', moviesCtrl.setPopularMovies)

// ruta de series
api.get('/tv/:id?', moviesCtrl.setPopularTv)

api.get('/search/:name?', moviesCtrl.search)

// ruta information
api.get('/information/', moviesCtrl.information)

module.exports = api