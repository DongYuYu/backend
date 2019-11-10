require('dotenv').config()
const express = require('express')
const app = express()
const parseBody = require('body-parser')
const baseUri = 'http://localhost:3023/persons'
const morgan = require('morgan')



app.use(express.static('build'))


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
const Phone = require('./model/persons')
app.use(parseBody.json())


app.use(morgan('combined'))
app.delete('/persons/:id', (req, res, next) => {
    // const id = Number(req.params.id)








    // phones = phones.filter((note) => note.id !== id)
    
    // res.status(204).end()

    Phone.findByIdAndDelete(req.params.id).then((response) => {
      console.log(response)
    
    if (response) {



      res.status(204).end()
    }else {
      
      res.status(203).end()
    }
    
    
    
    
    
    }).catch(error => next(error))
})
app.get('/persons', (req, res) => {
  Phone.find({}).then((phonesData) => {
    

    console.log(phonesData)
    
    phones = phonesData
    res.json(phonesData.map(phoneData => phoneData.toJSON()))
  })  
})
app.get('/persons/:id', (req, res, next) => {





    // const id = Number(req.params.id)
    
    // const phone = phones.filter((phone) => phone.id === id)

    // if(phone.length > 0){
    //     console.log('ok', phone)
    //     res.json(phone)
    // } else {
    //     res.status(404).end()
    
    // }

    Phone.findById(req.params.id).then(note => res.json(note.toJSON()))
    .catch(exception => {next(exception)})
    
})


app.post('/persons', (req, res, next) => {
   
    const phone = req.body

    // const newPhone = {
    //     name: phone.name,
    //     id: generateId()
    // }

    // const findName = phones.find((phone1) => phone1.name === phone.name)
    // if (findName) {

    //     //res.status(500).send({error: 'already exists'})
    //     console.log('beforenext')
    //     next()
    // }else {
    // console.log('id', newPhone.id, typeof(newPhone.id))
    // phones = phones.concat(newPhone)
    // res.json(newPhone)}





    if (phone.name === undefined) {
      return res.status(400).json({error: 'content not exist'})
    }







    const phoneData = new Phone({
      name: phone.name,
      
      
      
      
      
      
      
      
      
      phone: ''})
    phoneData.save().then(savedNote => {console.log('here'); res.json(savedNote.toJSON())})
  .catch(exception =>{next(exception)})})


function generateId() {





    return Math.max(...phones.map(phone => phone.id)) + 1
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
function errorHandler (error, req, res, next) {
  console.log('ERRORHANDLER', error)
  if (error.name === 'ValidationError') {

    res.status(400).json(error)
  }
  res.status(500).send('Something broke!')
}
app.use(errorHandler)
app.listen('3023')
console.log('app listen for 3023')