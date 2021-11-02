const jwt = require('jsonwebtoken')

// middleware to validate token
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({error:'Acceso denegado'})

    try {
        const verification = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user =verification
        next()
    
    } catch (error) {
        res.status(400).json({error:'el token no es valido'})
    }
}

module.exports = verifyToken