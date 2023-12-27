const express = require('express')
const cors = require('cors')
const app = express()
let notes = [{
    "id": 1,
    "content": "HTML is easy",
    "important": true
},
{
    "id": 2,
    "content": "Browser can execute only JavaScript",
    "important": false
},
{
    "id": 3,
    "content": "GET and POST are the most important methods of HTTP protocol",
    "important": false
},
{
    "content": "It is getting easier day by day",
    "important": false,
    "id": 4
}
]


app.use(express.json())
app.use(cors())
const generateId = () => {
    const maxId = notes.length > 0 ?
        Math.max(...notes.map(n => n.id)) :
        0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
})

app.get('/', (request, respond) => {
    respond.json(notes)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})