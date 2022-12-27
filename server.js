const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require ('mongodb').MongoClient
const PORT = 5050
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'parksideVirtualWalk'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())



const parks = {
    'arches':{
        'parkFullName': 'Arches National Park',
        'location': 'Utah State, USA',
        'video': 'https://www.youtube.com/watch?v=oHs6dIEuA9Q'
    },
    'olympic': {
        'parkFullName': 'Olympic National Park',
        'location': 'Washington State, USA',
        'video': 'https://www.youtube.com/watch?v=9frdQgL9WlQ' 
    },
    'redwood': {
        'parkFullName': 'Redwood National Park',
        'location': 'California State, USA',
        'video': 'https://www.youtube.com/watch?v=IOEGIGx8rr4'
    },
    'yellowstone': {
        'parkFullName': 'Yellowstone National Park',
        'location': 'Wyoming State, USA',
        'video': 'https://www.youtube.com/watch?v=ATsJFCtl-wk'
    },
    'zion': {
        'parkFullName': 'Zion National Park',
        'location': 'Utah State, USA',
        'video': 'https://www.youtube.com/watch?v=YsCUEnQifPE'
    }, 
    'not found': {
        'parkFullName': 'not found',
        'location': 'not found',
        'video': 'not found'
    }

}

// app.get('/', (request, response) => {
//     response.sendFile(__dirname + '/index.html')
// })

app.get('/',(request, response)=>{
    db.collection('parks').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})


app.post('/addPark', (request, response) => {
    db.collection('parks').insertOne({parkName: request.body.parkName,
    parkLocation: request.body.parkLocation, parkVideo: request.body.parkVideo, likes: 0})
    .then(result => {
        console.log('Park Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})
















app.get('/api', (request, response) => {
    response.json(parks)
})

app.get('/api/:name', (request, response) => {
    const parkShortName = request.params.name.toLowerCase()
    if (parks[parkShortName]) {
        response.json(parks[parkShortName])
    }else {
        response.json(parks['not found'])
    }
} )


app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on port ${PORT} . . . `)
})

