const fetch = require('node-fetch');
require('dotenv').config()

const url_path = process.env.URL_PATH;
const api_key = process.env.API_KEY;

const getMovies = (type) => {
    const url = `${url_path}/3/movie/${type}?api_key=${api_key}&language=en-US&page=1`
    return fetch(url)
    .then(response => response.json())
    .then(result => result.results)
    .catch(e => console.log(e))
}

async function setAllMovies (req, res) {
    const movies = await getMovies('now_playing')
    const popularMovies = await getMovies('popular')
    const topRated = await getMovies('top_rated')
    res.render('index',{
        title:'Index',
        movies,
        popularMovies,
        topRated
    })
}

async function setPopularMovies (req, res) {
    const movies = await getMovies('popular')
    res.render('popular',{
        title:'Popular Movies',
        movies
    })
}

async function setNowPlaying (req, res) {
    const movies = await getMovies('now_playing')
    res.render('nowPlaying', {
        title:'Now Playing'
    })
}

function search (req, res) {
    res.render('search', {
        title:'Search'
    })
}

module.exports = {
    setAllMovies,
    setPopularMovies,
    setNowPlaying,
    search
}