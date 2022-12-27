const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 5025

app.use(cors())

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

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

