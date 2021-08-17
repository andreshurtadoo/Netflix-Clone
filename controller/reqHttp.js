const { response } = require('express')
const fetch = require('node-fetch')
require('dotenv').config()


function getPopularMovies () {
    const url = `${process.env.URL_PATH}/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    return fetch(url)
    .then(response => response.json())
    .then(result => result.results)
    .catch(e => console.log(e))
}

async function setPopularMovies (req, res) {
    const movies = await getPopularMovies()
    res.render('popular',{
        title:'Popular Movies',
        movies
    })
}


function getNewMovies () {
    const url = `${process.env.URL_PATH}/3/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=1`
    return fetch(url)
    .then(response => response.json())
    .then(result => result.results)
    .catch(e => console.log(e))
}

async function setNewMovies (req, res) {
    const movies = await getNewMovies()
    const popularMovies = await getPopularMovies()
    res.render('index',{
        title:'Index',
        movies,
        popularMovies
    })
}


function getOneMovieById (req, res) {
    const id = req.params.id
    const url = `${process.env.URL_PATH}/3/find/${id}?api_key=${process.env.API_KEY}&language=en-US&external_source=imdb_id`
    return fetch(url)
    .then(response => response.json())
    .then(result => {
        const movie = result.movie_results
        res.render('movie', {
            title:'hello',
            movie
        })
    })
    .catch(e => console.log(e))
}


module.exports = {
    setPopularMovies,
    setNewMovies,
}