const User = require('../models/user')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    const saltRound = 10
    const passwordHash = await bcrypt.hash(password, saltRound)

    const user = new User({
        username,
        name,
        passwordHash

    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)

})

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('notes', { content: 1, important: 1 })
    response.json(users)
})

module.exports = userRouter