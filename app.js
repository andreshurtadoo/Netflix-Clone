const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./router/routerMovies')

// auth user - login and register
const auth = require('./router/auth')

// verication of token
const verifyToken = require('./middleware/verifyToken')

// private router
const admin = require('./router/admin')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

app.use('/', api)

// login and register
app.use('/api', auth)

// private router
app.use('/api/admin', verifyToken, admin)

app.use('*', (req, res) => {
    res.status(404).render('404',{
        title:'404'
    })
})

module.exports = app
