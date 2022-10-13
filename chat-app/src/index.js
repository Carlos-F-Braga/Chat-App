// Finished by Carlos Frederyco

const server = require('./app')

const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log('Server is listening on port', port )
})