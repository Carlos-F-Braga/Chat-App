const socket = io()

//elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')
const $sidebar = document.querySelector('#sidebar')

//templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

//options
const {username, room} = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoScroll = () => {
    //elemento da nova mensagem
    const $newMessage = $messages.lastElementChild

    //altura das novas mensagens
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    //altura visível na tela
    const visibleHeight = $messages.offsetHeight

    //altura do container com todas as mensagens
    const ContainerHeight = $messages.scrollHeight

    //distância que foi scrollada
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (ContainerHeight - newMessageHeight <= scrollOffset + newMessageHeight * 4) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

socket.on('locationMessage', (message) => {
    const html = Mustache.render(locationTemplate, {
        username: message.username,
        createdAt: moment(message.createdAt).format('HH:mm'),
        message: 'My current location',
        url: message.url,
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('HH:mm'),
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    console.log(room, users)
    $sidebar.innerHTML = html
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

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})