const express = require('express')
const api = express.Router()

// SETTERS
const home = require('../controller/home')
const movie = require('../controller/movie')
const tv = require('../controller/tv')
const search = require('../controller/search')
const aboutMe = require('../controller/aboutMe')

// RUTA HOME
api.get('/', home.setData)

// RUTA MOVIES AND MOVIE_ID => acomodar variable de entorno
api.get('/movie/:id([0-9]{6})?', movie.setPopularMovies)

// RUTA TV
api.get('/tv/:id?', tv.setPopularTv)

// RUTA SEARCH
api.get('/search/:name?', search.search)

// RUTA ABOUT_ME
api.get('/information/', aboutMe.information)

// EXPORT
module.exports = api