const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'Frontend', 'build')))
const Note = require('./models/note')

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'Frontend', 'build', 'index.html'))
})

app.get('/api/notes', (request, response, next) => {
  Note.find({})
    .then((notes) => {
      response.json(notes)
    })
    .catch((error) => next(error))
})
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: body.date || new Date(),
  })
  note
    .save()
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((error) => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body
  // const note = {
  //   content: content,
  //   important: important,
  // };

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  // console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if ((error.name === 'ValidationError')) {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
