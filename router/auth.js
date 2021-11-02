const router = require('express').Router()

const User = require('../model/UserLogin')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const joi = require('@hapi/joi')

const schemaRegister = joi.object({
    name: joi.string().min(6).max(255).required(),
    email: joi.string().min(6).max(255).required().email(),
    password: joi.string().min(6).max(1044).required()
})

const schemaLogin = joi.object({
    email: joi.string().min(6).max(255).required().email(),
    password: joi.string().min(6).max(1044).required()
})

// login
router.post('/login', async (req, res) => {
    // validation
    const { error } = schemaLogin.validate(req.body)
    if (error) return res.status(400).json({ error:error.message})

    // verication user
    const user = await User.findOne({ email:req.body.email })
    if (!user) return res.status(400).json({ error: 'User dosn`t existx' })

    // validation password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).json({ error: 'Passowor is invalid' })

    // token
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({
        error:null,
        data: { token }
    })

    // redirect

})


// register
router.post('/register', async (req, res) => {
    // validation
    const { error } = schemaRegister.validate(req.body)
    if (error) return res.status(400).json({ error:error.message })

    // verification is the email already exists
    const isEmailExist = await User.findOne({ email:req.body.email })
    if (isEmailExist) return res.status(400).json({ error:'The email is already exists' })

    // encrypt the password
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password
    })

    try {
        const userDB = await user.save()
        res.status(200).json({
            error:null,
            message:'Successful registration',
            data: userDB
        })
        
    } catch (error) {
        res.status(400).json({error:error})
    }
})


module.exports = router