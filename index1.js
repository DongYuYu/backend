const express = require('express')
const app = express()
const parseBody = require('body-parser')
const baseUri = 'http://localhost:3023/persons'
const morgan = require('morgan')
let phones =  [
    {
      "number": "2323223",
      "name": "Love",
      "id": 7
    },
    {
      "number": "2323223",
      "name": "You",
      "id": 8
    },
    {
      "number": "2323223",
      "name": "Bhagavan",
      "id": 10
    },
    {
      "number": "2323223",
      "name": "me",
      "id": 12
    },
    {
      "number": "2323223",
      "name": "love",
      "id": 14
    },
    {
      "number": "2323223",
      "name": "I",
      "id": 15
    },
    {
      "number": "2323223",
      "name": "you",
      "id": 16
    },
    {
      "number": "2323223",
      "name": "sky",
      "id": 17
    },
    {
      "number": "2323223",
      "name": "Love",
      "id": 18
    }
  ]
app.get('/info', (req, res) => {

    res.send(`<p>phone has ${phones.length} entries</p> <p>${new Date()}</p>`)
})
app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', "GET, POST, DELETE, OPTIONS")
res.header('Access-control-Allow-Headers', 'Content-Type')










if (req.method === "OPTIONS") {
  return res.status(200).end();
}
next();
});

app.use(parseBody.json())


app.use(morgan('combined'))
app.delete('/persons/:id', (req, res) => {
    const id = Number(req.params.id)








    phones = phones.filter((note) => note.id !== id)
    res.status(204).end()
})
app.get('/persons', (req, res) => {
    res.json(phones)
})
app.get('/persons/:id', (req, res) => {





    const id = Number(req.params.id)
    
    const phone = phones.filter((phone) => phone.id === id)

    if(phone.length > 0){
        console.log('ok', phone)
        res.json(phone)
    } else {
        res.status(404).end()
    
    }
})

app.post('/persons', (req, res, next) => {
    const phone = req.body


    const newPhone = {
        name: phone.name,
        id: generateId()
    }

    const findName = phones.find((phone1) => phone1.name === phone.name)
    if (findName) {

        //res.status(500).send({error: 'already exists'})
        console.log('beforenext')
        next()
    }else {
    console.log('id', newPhone.id, typeof(newPhone.id))
    phones = phones.concat(newPhone)
    res.json(newPhone)}



}, errorHandler)


function generateId() {





    return Math.max(...phones.map(phone => phone.id)) + 1
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
function errorHandler (req, res, next) {
  console.log('here')
  //console.error(err.stack)
  res.status(500).send('Something broke!')
}
app.listen('3023')
console.log('app listen for 3023')