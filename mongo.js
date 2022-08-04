const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://AbikMushyakho:${password}@first-cluster.xyztx.mongodb.net/fullstack?authSource=admin&replicaSet=atlas-kmg6s0-shard-0&readPreference=primary&ssl=true`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
 
  })
  const note = new Note({
    content: 'HTML is Easy',
    date: new Date(),
    important: true,
  })

//   note.save().then(() => {
//     console.log('note saved!')
//     return mongoose.connection.close()
//   })
//   .catch((err) => console.log(err))
Note.find({important: true }).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })