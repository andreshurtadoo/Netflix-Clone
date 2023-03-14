const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./router/routerMovies')

const port = process.env.PORT || 3001

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

app.use('/', api)

app.use('*', (req, res) => {
    res.status(404).render('404',{
        title:'404'
    })
})

app.listen(port, () => {
    console.log(`Listen server on = localhost:${port}`);
})
