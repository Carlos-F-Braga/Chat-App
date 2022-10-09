const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#Message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value
    e.target.elements.message.value = ''
    e.target.elements.last.value = message
    
    socket.emit('sendMessage', message)
} )