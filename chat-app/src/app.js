const path = require('path')
const http = require('http')
const express = require('express')
const bp = require('body-parser')
const sockeio = require('socket.io')

const publicDirectoryPath = path.join(__dirname, '../public')

const app = express()
const server = http.createServer(app)
const io = sockeio(server)

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New websocket connection')

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('sendMessage', (message, callback) => {
        console.log('Mensagem: ' + message)
        io.emit('message', message)
        callback();
    })

    socket.on('sendLocation', ({latitude, longitude}, callback) => {
        const message = `https://google.com/maps?q=${latitude},${longitude}`
        io.emit('message', message)
        callback();
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })
})



module.exports = server