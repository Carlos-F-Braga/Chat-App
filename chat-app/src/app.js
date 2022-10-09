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

let message = 'Welcome'

io.on('connection', (socket) => {
    console.log('New websocket connection')

    socket.emit('message', message)

    socket.on('sendMessage', (message) => {
        console.log('Mensagem: ' + message)
        io.emit('message', message)
    })
})



module.exports = server