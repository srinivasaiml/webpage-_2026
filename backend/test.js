const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

const uri = "mongodb+srv://vasu61078:vasu61078@cluster0.wh7wssf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.get("/test-db", async (req, res) => {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        res.json({ message: "MongoDB Connected Successfully" });
    } catch (err) {
        res.json({ error: err.message });
    } finally {
        await client.close();
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});