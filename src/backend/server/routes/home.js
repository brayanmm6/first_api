const express = require("express")
const db = require("../../api")

const homeRoute = express.Router()

homeRoute.get("/", async (req, res) => {
    try {
        const response = await db.showTasks()
        res.status(200).json(response)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = homeRoute