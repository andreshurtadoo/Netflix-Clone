const fetch = require('node-fetch');
require('dotenv').config()

const url_path = process.env.URL_PATH;
const api_key = process.env.API_KEY;

// get movies
const getMovies = (type, language, page) => {
    const url = `${url_path}/3/movie/${type}?api_key=${api_key}&language=${language}&page=${page}`
    return fetch(url)
    .then(response => response.json())
    .then(result => result.results)
    .catch(e => console.log(e))
}

// get Details
const getOneMovie = (id, language) => {
    const url = `${url_path}/3/movie/${id}?api_key=${api_key}&language=${language}`
    return fetch(url)
    .then(response => response.json())
    .then(result => result)
    .catch(e => console.log(e))
}

// get video
const getTeaser = (id, language) => {
    const url = `${url_path}/3/movie/${id}/videos?api_key=${api_key}&language=${language}`
    return fetch(url)
    .then(response => response.json())
    .then(result => result.results)
    .catch(e => console.log(e))
}

// set index
async function setAllMovies (req, res) {
    const { language='en' , page=1 } = req.query

    const movies = await getMovies('now_playing', language, page)
    const popularMovies = await getMovies('popular', language, page)
    const topRated = await getMovies('top_rated', language, page)
    res
    .status(200)
    .render('index',{
        title:'Index',
        movies,
        popularMovies,
        topRated
    })
}

// set movies - popular.ejs
async function setPopularMovies (req, res) {
    const { id } = req.params
    const { language ='en-US' , page=1 } = req.query
    if (!id) {        
        const movies = await getMovies('popular', language, page)
        res
        .status(200)
        .render('popular',{
            title:'Popular Movies',
            movies
        })
    }else{
        const movie = await getOneMovie(id, language)
        const teaser = await getTeaser(id, language)
        res
        .status(200)
        .render('movie',{
            movie,
            teaser
        })
    }
}

async function setNowPlaying (req, res) {
    const movies = await getMovies('now_playing')
    res.render('nowPlaying', {
        title:'Now Playing'
    })
}

function search (req, res) {
    res
    .status(200)
    .render('search', {
        title:'Search'
    })
}

module.exports = {
    setAllMovies,
    setPopularMovies,
    setNowPlaying,
    search
}