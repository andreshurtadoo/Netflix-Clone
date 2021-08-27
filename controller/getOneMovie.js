const fetch = require('node-fetch');
require('dotenv').config()

const url_path = process.env.URL_PATH;
const api_key = process.env.API_KEY;

const getOneMovie = (id) => {
    const url = `${url_path}/3/movie/${id}?api_key=${api_key}&language=en-US`
    return fetch(url)
    .then(response => response.json())
    .then(result => result)
    .catch(e => console.log(e))
}

async function setOneMovie (req, res) {
    let id = req.params.id
    const movie = await getOneMovie(id)
    res.render('movie', {
        movie
    })
}

module.exports = {
    setOneMovie,
}