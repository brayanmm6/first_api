const express = require("express")
require("dotenv").config()
const homeRoute = require("./routes/home")
const newTask = require("./routes/new-task")
const completeTask = require("./routes/complete-task")

const app = express()

app.use(express.json())

app.use(homeRoute)

app.use(newTask)

app.use(completeTask)

app.listen(3000, (error) => {
    if(error) throw error
    console.log(`Server rodando em http://localhost:3000`)
})