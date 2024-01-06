const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)
const bcrypt = require('bcrypt')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('Sagar', 10)
        const user = new User({ username: 'Tanu', passwordHash })
        await user.save()
    })

    test('new creation', async () => {
        const initialUsers = await helper.usersInDb()
        const newUser = {
            username: 'Savvy',
            name: 'Sagar Rana',
            password: '@sagarrana119',
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(initialUsers.length + 1)

        const userName = usersAtEnd.map(u => u.username)
        expect(userName).toContain(newUser.username)

    })

})