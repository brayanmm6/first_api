const express = require("express")
const api = require("../../api")

const completeTask = express.Router()

completeTask.put("/complete-task/:id", (req, res) => {
    try {
        api.finishTask(req.params.id)
        res.status(200).send("Succesfully")
    } catch (err) {
        res.status(502).send(err)
    }
})

module.exports = completeTask