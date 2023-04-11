// RENDER VIEW TO SEARCH PAGE
const DATA = require('./getters')

async function search (req, res) {
    const { query } = req.query
    const movies = await DATA.getSearchMovies(query)
    
    res
        .status(200)
        .render('search', {
            movies,
            title: 'Search'
        })
}

module.exports = { search }