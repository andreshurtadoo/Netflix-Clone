const { response } = require('express');
const fetch = require('node-fetch');
require('dotenv').config()

const url_path = process.env.URL_PATH;
const api_key = process.env.API_KEY;

// GET FUNCTION

// saca todos los elementos 
const getElements = (kind, type, language, page) => {
    const url = `${url_path}/3/${kind}/${type}?api_key=${api_key}&language=${language}&page=${page}`
    return fetch(url)
    .then(response => response.json())
    .then(result => result.results)
    .catch(e => console.log(e))
}

// saca solo un elemento
const getOneElement = (kind, id, language) => {
    const url = `${url_path}/3/${kind}/${id}?api_key=${api_key}&language=${language}`
    return fetch(url)
    .then(response => response.json())
    .then(result => result)
    .catch(e => console.log(e))
}

// saca el trailer
const getTeaser = (kind, id, language) => {
    const url = `${url_path}/3/${kind}/${id}/videos?api_key=${api_key}&language=${language}`
    return fetch(url)
    .then(response => response.json())
    .then(result => result.results)
    .catch(e => console.log(e))
}

// saca la peli que estas buscando
function getSearchMovies (name) {
    const url = `${url_path}/3/search/movie?api_key=${api_key}&language=es-US&query=${name}&page=1&include_adult=false`
    return fetch(url)
    .then(response => response.json())
    .then(result => result.results)
    .catch(e => console.log('problema en el url'))
    
}


// SET FUNCTION

// agrega todos los resultado al index
async function setAllMovies (req, res) {
    const { language='en' , page=1 } = req.query

    const newMovies = await getElements('movie', 'now_playing', language, page)
    const popularMovies = await getElements('movie', 'popular', language, page)
    const topRated = await getElements('movie', 'top_rated', language, page)
    const latest = await getElements('movie', 'latest', language, page)
    const upcoming = await getElements('movie', 'upcoming', language, page)
    const tv = await getElements('tv', 'popular', language, page)
    res
    .status(200)
    .render('index',{
        title:'Index',
        newMovies,
        popularMovies,
        topRated,
        latest,
        upcoming,
        tv
    })
}

// agrega la pelicular a la pagina de peliculas
async function setPopularMovies (req, res) {
    const { id } = req.params
    const { language ='en-US' , page=1 } = req.query
    if (!id) {        
        const movies = await getElements('movie', 'popular', language, page)
        res
        .status(200)
        .render('popular',{
            title:'Popular Movies',
            movies
        })
    }else{
        const movie = await getOneElement('movie', id, language)
        const teaser = await getTeaser('movie', id, language)
        res
        .status(200)
        .render('movie',{
            movie,
            teaser
        })
    }
}

// agrega las series en la pagina de series
async function setPopularTv (req, res) {
    const { id } = req.params
    const { language='en', page=1 } = req.query
    if (!id) {
        const tvs = await getElements('tv', 'popular', language, page)
        res
        .status(200)
        .render('popularTv', {
            title: 'Popular tv',
            tvs
        })
    }else{
        const tv = await getOneElement('tv', id, language)
        const teaser = await getTeaser('tv', id, language)
        res
        .status(200)
        .render('tv', {
            tv,
            teaser
        })
    }
}

async function search (req, res) {
    const { query } = req.query
    const movies = await getSearchMovies(query)
    res
    .status(200)
    .render('search', {
        movies,
        title: 'Search'
    })
    
}

function information(req, res){
    // const {query} = req.query
    res
    .status(200)
    .render('aboutMe',{
        name:'Andres Hurtado',
        pais:'Venezuela',
        ci:'29626410'
    })
}

module.exports = {
    setAllMovies,
    setPopularMovies,
    setPopularTv,
    search,
    information
}