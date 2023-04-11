// RENDER VIEW TO MOVIES AND MOVE_ID PAGE
const DATA = require('./getters')

async function setPopularMovies (req, res) {
    const { id } = req.params
    const { page=1 } = req.query

    if (!id) {        
        const movies = await DATA.getElements('movie', 'popular', page)
        res
            .status(200)
            .render('popular', {
                title:'Popular Movies',
                movies
            })
    }
    else {
        const movie = await DATA.getOneElement('movie', id)
        const teaser = await DATA.getTeaser('movie', id)
        res
            .status(200)
            .render('movie', {
                movie,
                teaser
            })
    }
}

module.exports = { setPopularMovies }