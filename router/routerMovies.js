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
api.get('/movie', movie.setPopularMovies)

api.get('/movie/:id', (req, res) => {
    const { id } = req.params

    // Validamos que sean exactamente 6 dígitos numéricos
    // if (!/^[0-9]{6}$/.test(id)) {
    //     return res.status(400).json({ error: 'El ID de la película debe tener 6 dígitos numéricos.' });
    // }

    return movie.setPopularMovies(req, res);
})

// RUTA TV
api.get('/tv', tv.setPopularTv)

api.get('/tv/:id', (req, res) => {
    const { id } = req.params

    // Validamos que sean exactamente 6 dígitos numéricos
    // if (!/^[0-9]{6}$/.test(id)) {
    //     return res.status(400).json({ error: 'El ID de la serie debe tener 6 dígitos numéricos.' });
    // }

    return tv.setPopularTv(req, res);
})

// RUTA SEARCH
api.get('/search', search.search)
api.get('/search/:name', search.search)

// RUTA ABOUT_ME
api.get('/information/', aboutMe.information)

// EXPORT
module.exports = api