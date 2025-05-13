import dotenv from "dotenv";
import express from "express";
import { app } from "./app.js";
import connectToDb from "./db/index.js";
import path from "path";

dotenv.config();

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
    // Serve static files from frontend/dist
    app.use(express.static(path.join(__dirname1, "../frontend/dist")));

    // Serve index.html for all remaining routes (React/Vite routing)
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname1, "../frontend", "dist", "index.html")
        );
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running successfully");
    });
}

//---------------------------

connectToDb()
    .then(() => {
        app.on("Error", () => {
            console.log("Error in communication between server and Db");
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log("Server running at port", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log("Connection failed at index.js", error);
    });
