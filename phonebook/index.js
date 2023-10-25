const express = require('express')
const app = express()
app.use(express.json())

let notes = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${notes.length} people</p>
                 <p>${new Date()}</p>
  `)
})

app.get('/api/persons', (request, response) => {
  response.json(notes)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(n => n.id === id)
  if(note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(n => n.id !== id)
  response.status(204).end()
})

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if(!body.name) {
    return response.status(404).json({
      error: "Name is missing"
    })
  }

  if(!body.number) {
    return response.status(404).json({
      error: "Number is missing"
    })
  }

  const names = notes.map(n => n.name)

  if(names.includes(body.name)) {
    return response.status(400).json({
      error: "Duplicate name"
    })
  }
  
  const note = {
    name: body.name,
    number: body.number,
    id: getRandomInt(10000)
  }

  notes = notes.concat(note)
  response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})