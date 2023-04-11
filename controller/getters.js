const { response } = require('express');
const fetch = require('node-fetch');
require('dotenv').config()

// VARIABLES DE ENTORNO
const URL_PATH = process.env.URL_PATH;
const API_KEY = process.env.API_KEY;

// GET ALL DATA
const getElements = (kind, type, page) => {
    const url = `${URL_PATH}/3/${kind}/${type}?api_key=${API_KEY}&language=en&page=${page}`
    return fetch(url)
        .then( response => response.json() )
        .then( result => result.results )
        .catch( e => console.log(`Error on getElements ${e}`) ) 
}

// GET ONLINE ONE ELEMENT
const getOneElement = (kind, id) => {
    const url = `${URL_PATH}/3/${kind}/${id}?api_key=${API_KEY}&language=en`
    return fetch(url)
        .then( response => response.json() )
        .then( result => result )
        .catch( e => console.log(`Error on getOneElement ${e}`) )
}

// GET TEASER
const getTeaser = (kind, id) => {
    const url = `${URL_PATH}/3/${kind}/${id}/videos?api_key=${API_KEY}&language=en`
    return fetch(url)
        .then( response => response.json() )
        .then( result => result.results )
        .catch( e => console.log(`Error on getTeaser ${e}`) )
}

// GET ELEMENT BY SEARCH
function getSearchMovies (name) {
    const url = `${URL_PATH}/3/search/movie?api_key=${API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`
    return fetch(url)
        .then( response => response.json() )
        .then( result => result.results )
        .catch( e => console.log(`Error on getSearchMovies ${e}`) )   
}

// EXPORTS
module.exports = {
    getElements,
    getOneElement,
    getTeaser,
    getSearchMovies
}