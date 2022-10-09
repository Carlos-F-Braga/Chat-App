const path = require('path')
const express = require('express')
const bp = require('body-parser')

const publicDirectoryPath = path.join(__dirname, '../public')

const app = express()
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(express.static(publicDirectoryPath))

module.exports = app