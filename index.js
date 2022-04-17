const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const app = express()
const server = require('http').createServer(app)
const { Server } = require("socket.io");
const io = new Server(server)

app.use('/', serveStatic(path.join(__dirname, '/dist')))

const port = 4000
// const port = process.env.PORT || 8080

server.listen(port, () => {
    io.on('connection', client => {
        console.log('connection')
        client.on('SendMessage', (msg) => {
            console.log(`msg: ${msg}`)
            console.log(`msg.msg: ${msg.msg}`)
            io.sockets.emit('ReceiveMessage', {
                ...msg
            })
        })
    })
})