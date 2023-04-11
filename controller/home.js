// RENDER VIEW TO HOME PAGE
const DATA = require('./getters')

async function setData (req, res) {
    const { page=1 } = req.query

    const upcoming = await DATA.getElements('movie', 'upcoming', page)
    const tv = await DATA.getElements('tv', 'popular', page)
    
    res
        .status(200)
        .render('index', {
            title:'Index',
            upcoming,
            tv
        })
}

module.exports = { setData }