const http = require('http')

const url = 'http://api.weatherstack.com/current?access_key=1372f2db0562c13bc01b59b2830654a9&query=45,-75&units=m'

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
        
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
        pressure = body.current.pressure
        console.log('Pressão:', pressure)
    })

})

request.on('error', (error) => {
    throw error
})

request.end()