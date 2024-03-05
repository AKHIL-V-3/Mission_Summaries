const express = require("express")
const http = require("http")
const router = require('./router')
const db = require("./Connection")

const app = express()
const server = http.createServer(app)

app.use(express.json())

app.use('/',router)

server.listen(3000,()=>{
      console.log('server is running on port 3000');
})

