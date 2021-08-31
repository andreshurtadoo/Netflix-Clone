const fetch = require('node-fetch');
require('dotenv').config()

const url_path = process.env.URL_PATH;
const api_key = process.env.API_KEY;

const getOneMovie = (id, language) => {
    const url = `${url_path}/3/movie/${id}?api_key=${api_key}&language=${language}`
    return fetch(url)
    .then(response => response.json())
    .then(result => result)
    .catch(e => console.log(e))
}

const getTeaser = (id, language) => {
    const url = `${url_path}/3/movie/${id}/videos?api_key=${api_key}&language=${language}`
    return fetch(url)
    .then(response => response.json())
    .then(result => result.results)
    .catch(e => console.log(e))
}

async function setOneMovie (req, res) {
    let id = req.params.id
    const { language ='en-US' } = req.query
    if(!id){
        res.send('No hay id')
    }else{
        const movie = await getOneMovie(id, language)
        const teaser = await getTeaser(id, language)
        res.render('movie', {
            movie,
            teaser
        })
        // console.log(teaser);
    }
}

module.exports = {
    setOneMovie
}