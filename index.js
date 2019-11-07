//const http = require('http') //import http from 'http'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]


























  app.use(bodyParser.json())
  /*
  const app = http.createServer((req, res) => {
    res.writeHead(200, {'Contect-Type': 'application/json'})
    
    res.end(JSON.stringify(notes))
})
*/


app.get('/', (req, res) => {

    res.send('<h1> Hi </h1>')
})



app.get('/notes/:id', (req, res) => {

    const id = Number(req.params.id);
    console.log(id)
    const note1 = notes.find((note) => note.id === id)
    
    
    if (note1) {res.json(note1)} else {res.status(404).end()}
})

app.post('/notes', (req, res) => {
    const note = req.body
    console.log(req.headers)
    console.log(req.body)
    res.json(note)
})
app.get('/notes', (req, res) => {
    res.json(notes)
})
const port = 3023
app.listen(port)
console.log(`Server running on port ${port}`)