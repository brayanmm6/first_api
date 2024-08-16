const express = require("express")
const api = require("../../api")

const newtaskRoute = express.Router()

newtaskRoute.post("/newTask", (req, res) => {   
    try {
        const newInfo = req.body
        api.newTask(newInfo)
        res.status(200).send("finalizado")
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = newtaskRoute