const express = require("express")
const { denseTask } = require("./dense")

const app = express()
const PORT = process.env.PORT || 8090;

app.get("/",(req,res) =>{
    return res.json({message:`This is express Dense Task Server`})
});

app.get("/dense", async(req,res) =>{
    try {
        const task_completion_time = await denseTask();
        return res.json({
            status:`Success`,
            error:`Task completed in ${task_completion_time} ms`
        });
    } catch (error) {
        return res.status(500)
        .json({status:`Error`,error:`Internal server error`})
    }
});

app.listen(PORT,() =>
    console.log(`Dense Task Server is running on Port ${PORT}`)
)