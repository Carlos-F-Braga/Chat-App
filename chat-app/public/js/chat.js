const socket = io()

//elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML

socket.on('locationMessage', (message) => {
    const html = Mustache.render(locationTemplate, {
        createdAt: moment(message.createdAt).format('HH:mm'),
        message: 'My current location',
        url: message.url
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('HH:mm'),
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!e.target.elements.message.value)
    return;

    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value
    
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