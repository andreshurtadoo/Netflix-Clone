const mongoose = require('mongoose')
const app = require('./app')

require('dotenv').config()
const port = process.env.PORT || 3001
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.fpgv6.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser:true , useUnifiedTopology:true })
.then( () => console.log('Conexion exitosa'),
    app.listen(port, () => {
        console.log(`Listen server on = localhost:${port}`);
    })
)
.catch( e => console.log(`Error de conexion ${e}`))