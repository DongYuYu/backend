const mongoose = require('mongoose')

if ( process.argv.length < 3 ) {

    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]

const phone = process.argv[4]

const uri = `mongodb+srv://dongyu:${password}@cluster0-ochp4.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true})

const personSchema = new mongoose.Schema({
    'name': String,
    'phone': String,
})

const Phone = mongoose.model('Phone', personSchema)

const phone1 = new Phone({
    name: name,
    phone: phone

})

phone1.save().then(response => {
    console.log('note saved!')
    mongoose.connection.close()
})
