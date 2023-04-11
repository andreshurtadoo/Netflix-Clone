// IMPORT DEPENDENCES
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const api = require('./router/routerMovies')

const port = process.env.PORT || 3001

// CONFIGURE EJS AND VIEWS
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// CONFIGUE PUBLIC FILES AND BODY PARSER
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

// USE THE API
app.use('/', api)

// ROUTE 404
app.use('*', (req, res) => {
    res.status(404).render('404',{
        title:'404'
    })
})

app.listen(port, () => {
    console.log(`Listen server on = localhost:${port}`);
})
