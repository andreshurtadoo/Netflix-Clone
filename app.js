const express = require('express')
const app = express()
const api = require('./router/routerMovies')
// const api2 = require('./router/routerOne')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static(__dirname + '/public'))

app.use('/', api)

// app.use('/', api2)

app.use((req, res, next) => {
    res.status(404).render('404',{
        title:'404'
    })
})

module.exports = app