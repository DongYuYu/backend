const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const password = 'FuZK5zqSPGlq5fwf'

const uri = process.env.MONGODB_URI//`mongodb+srv://dongyu:FuZK5zqSPGlq5fwf@cluster0-ochp4.mongodb.net/persons?retryWrites=true&w=majority`
mongoose.connect(uri, { useNewUrlParser: true})











const personSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},





  phone: String,

})




personSchema.set('toJSON', {

    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id




        delete returnedObject.__v
    }
})
personSchema.plugin(uniqueValidator)
const Phone = mongoose.model('Phone', personSchema)


















module.exports = Phone