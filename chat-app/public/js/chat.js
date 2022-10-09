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

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert()
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})