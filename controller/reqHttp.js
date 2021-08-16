const fetch = require('node-fetch')

function getPopularMovies () {
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=18f21ca3a155f61b7686ee78ec67a6e9&language=en-US&page=1'
    return fetch(url)
    .then(response => response.json())
    .then(result => result.results)
    .catch(e => console.log(e))
}

async function setMovies (req, res) {
    const movies = await getPopularMovies()
    res.render('index',{
        title:'index',
        newMovies: movies
    })
}

async function popular (req, res) {
    const movies = await getPopularMovies()
    res.render('popular',{
        title:'popular',
        newMovies: movies
    })
}


module.exports = {
    setMovies,
    popular
}