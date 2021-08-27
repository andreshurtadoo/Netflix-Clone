const express = require('express')
const api = express.Router()
const oneMovieCtrl = require('../controller/getOneMovie')

api.get('/:id?', oneMovieCtrl.setOneMovie)

module.exports = api