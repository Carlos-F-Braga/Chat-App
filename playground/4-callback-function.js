setTimeout(()=>{
    console.log('Two Seconds are Up!')
}, 2000)

const names = ['Andrew', 'Jen', 'Jess', 'Carlos']

const shortNames = names.filter((name) => {
    return name.length <= 4;
})

const geocode = (adress, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
    
        callback(data)
    }, 2000)

}

geocode('philadelphia', (data) => {
    console.log(data)
})


const add = (n, a, callback) => {
    setTimeout(() => {
        const sum = n + a
        callback(sum)
    }, 2000)

}
add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})