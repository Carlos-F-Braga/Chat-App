const socket = io()

const $messageForm = document.querySelector('#Message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')

socket.on('message', (message) => {
    console.log(message)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value
    e.target.elements.last.value = message
    
    let callback = () => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus();
        console.log('Message delivered')
    }
    
    socket.emit('sendMessage', message, callback)
})

$sendLocationButton .addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert()
    }
    
    $sendLocationButton.setAttribute('disabled', 'disabled')

    let callback = () => {
        $sendLocationButton.removeAttribute('disabled')
        console.log('Location Shared!')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, callback)
    })
})