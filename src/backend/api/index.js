require("dotenv").config()

const port = process.env.PORT

async function connect () {
    if(global.connection){
        return await global.connection.connect()
    }

    const { Pool } = require("pg")
    
    const pool = new Pool ({
        connectionString: process.env.CLOUD_CONNECTION_STRING,
        ssl : {
            rejectUnauthorized: false
        }
    })

    const client = await pool.connect()
    const res = await client.query("SELECT NOW()")
    console.log(res.rows)

    client.release()

    global.connection = pool

    return await pool.connect().then(pool.end())
}

const dbOperation = async (sql, target) => {
    const client = await connect()
    const res = await client.query(sql, target)
    return res
}

async function newTask ({...infos}) {
    const res = await dbOperation("INSERT INTO tasks (title, description) VALUES ($1, $2)", [infos.title, infos.description])
    return res.rows
}

async function deletTask (id) {
    const res = await dbOperation("DELETE FROM tasks WHERE id = $1", [id])
    return res.rows
}

async function editTask (id, {...target}) {
    target.title && await dbOperation("UPDATE tasks SET tasks = $1 WHERE id = $2", [target.title, id])
    target.description && await dbOperation("UPDATE tasks SET description = $1 WHERE id = $2", [target.description, id])
}

async function finishTask (id) {
    const res = await dbOperation("UPDATE tasks SET completed = true WHERE id = $1", [id])
    return res
}

async function showTasks () {
    const res = await dbOperation("SELECT * FROM tasks")
    return res.rows
}

module.exports = {
    newTask,
    deletTask,
    editTask,
    finishTask,
    showTasks
} 