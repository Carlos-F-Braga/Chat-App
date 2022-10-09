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

io.on('connection', () => {
    console.log('New websocket connection')
})

module.exports = server