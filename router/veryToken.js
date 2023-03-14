const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error:'Acceso Denegado' })

    try {
        const verication = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verication
        next()

    } catch (error) {
        res.status(400).json({ error:'Token no valido' })
    }
}

module.exports = verifyToken