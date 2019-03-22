// Express Framework
const express = require("express")
const app = express()

// Body Parser Library for Post Data
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Static Route to Serve the React App
app.use(express.static(__dirname + "/react-todomvc-app/build/"))

// Pseudo Database in Express
let nextId = 4
const notes = [{ id: 1, title: "first object" }, { id: 2, title: "second object" }, { id: 3, title: "third object" }]

// RESTFUL ROUTES:

// GET ALL
app.get("/notes", (request, response) => {
  response.json({
    payload: notes,
    status: true
  })
})

// "/notes/:id" ===     "/notes/3"      ==  request.params.id => 3
// "/notes/:id" ===     "/notes/hello"  == request.params.id => 'hello'

// GET 1
app.get("/notes/:id", (request, response) => {
  request.params.id
  const note = notes.find((note) => {
    console.log(note)
    console.log(request.params.id)
    if (note.id == request.params.id) {
      return note
    } else return false
  })
  console.log(note)
  response.json({
    status: true,
    note: note
  })
})

// CREATE 1
app.post("/notes", (request, response) => {
  console.log(request.body)
  notes.push({
    id: nextId++,
    title: request.body.title
  })
  response.json({
    status: true,
    notes: notes
  })
})

// DELETE 1
app.delete("/notes/:id", (request, response) => {
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].id == request.params.id) {
      notes.splice(i, 1)
      break
    }
  }
  response.json({
    status: true,
    notes: notes
  })
})

// UPDATE 1
app.put("/notes/:id", (request, response) => {
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].id == request.params.id) {
      notes[i] = Object.assign({}, notes[i], request.body)
    }
  }
  response.json({
    status: true,
    notes: notes
  })
})

// SERVER LISTENING
app.listen(1337, () => {
  console.log("Server restarted...")
})
