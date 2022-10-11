const path = require('path')
const http = require('http')
const express = require('express')
const bp = require('body-parser')
const sockeio = require('socket.io')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const publicDirectoryPath = path.join(__dirname, '../public')

const app = express()
const server = http.createServer(app)
const io = sockeio(server)

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New websocket connection')

    socket.on('sendMessage', (message, callback) => {
        console.log('Mensagem: ' + message)
        const user = getUser(socket.id)

        io.to(user.room).emit('message', generateMessage(user.username, message))

        callback();
    })

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Admin', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()
    })

    socket.on('sendLocation', ({latitude, longitude}, callback) => {
        const message = `https://google.com/maps?q=${latitude},${longitude}`
        const user = getUser(socket.id)

        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, message))
        callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})



module.exports = server