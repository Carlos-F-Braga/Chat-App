const path = require('path')
const http = require('http')
const express = require('express')
const bp = require('body-parser')
const sockeio = require('socket.io')
const { generateMessage, generateLocationMessage } = require('./utils/messages')

const publicDirectoryPath = path.join(__dirname, '../public')

const app = express()
const server = http.createServer(app)
const io = sockeio(server)

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New websocket connection')

    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('sendMessage', (message, callback) => {
        console.log('Mensagem: ' + message)
        io.emit('message', generateMessage(message))
        callback();
    })

    socket.on('sendLocation', ({latitude, longitude}, callback) => {
        const message = `https://google.com/maps?q=${latitude},${longitude}`
        io.emit('locationMessage', generateLocationMessage(message))
        callback();
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'))
    })
})



module.exports = server