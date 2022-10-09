const fs = require('fs')

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book)
// fs.writeFileSync('1-json.json', bookJSON)

// const dataBuffer = fs.readFileSync('1-json.json')
// const dataJSON = dataBuffer.toString()

// const data = JSON.parse(dataJSON)
// console.log(data.title)

//Challenge Completed
const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)
console.log(data.name, data.age)
data.name = "Carlos"
data.age = 20
console.log(data)
const userJSON = JSON.stringify(data)
fs.writeFileSync('1-json.json', userJSON)