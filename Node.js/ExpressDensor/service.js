const express = require("express")
const prom_client = require("prom-client") //metric collection
const { denseTask } = require("./dense")

const defaultMetrics = prom_client.collectDefaultMetrics;
defaultMetrics({ register: prom_client.register})

const app = express()
const PORT = process.env.PORT || 8090;

app.get("/",(req,res) =>{
    return res.json({message:`This is express Dense Task Server`})
});

app.get("/metrics", async (req, res) => {
    res.setHeader('Content-Type',prom_client.register.contentType);
    const metric = await prom_client.register.metrics();
    res.send(metric)
})

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