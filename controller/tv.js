// RENDER VIEW TO TVs AND TV_IS PAGE
const DATA = require('./getters')

async function setPopularTv (req, res) {
    const { id } = req.params
    const { page=1 } = req.query

    if (!id) {
        const tvs = await DATA.getElements('tv', 'popular', page)
        res
            .status(200)
            .render('popularTv', {
                title:'Popular tv',
                tvs
            })
    } 
    else {
        const tv = await DATA.getOneElement('tv', id)
        const teaser = await DATA.getTeaser('tv', id)
        res
            .status(200)
            .render('tv', {
                tv,
                teaser
            })
    }
}

module.exports = { setPopularTv }