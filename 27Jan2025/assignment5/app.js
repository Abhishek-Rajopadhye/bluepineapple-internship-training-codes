/*
    Assignment 5: Express and Middleware
    Objective: Build a basic REST API using Express and implement middleware.
        Set up an Express app:
            Create routes for:
                GET / – Respond with "Welcome to Express!"
                POST /data – Accept JSON data and respond with "Data received."
                GET /users – Respond with a list of users (mock data).
        Create middleware:
            Write a custom middleware to log the method and URL of every incoming request.
            Use app.use() to apply it globally.
        Error handling:
            Add a 404 middleware to handle invalid routes and respond with a custom message.
            Add an error-handling middleware to log errors and send a "Something went wrong!" response.
        Bonus (Optional):
            Connect the app to the https://jsonplaceholder.typicode.com API.
            Add a route GET /external-posts that fetches posts from the external API and responds with the data.
*/

const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

/*
    Made express app as per documentation.
    On request prints the date-time of request and the method and end url onto console.
*/

const users = [
    { id: 1, name: "Abhishek" },
    { id: 2, name: "Arjun" },
    { id: 3, name: "Kaustubh" },
    { id: 4, name: "Bhagyashree"},
    { id: 5, name: "Akansha" },
    { id: 6, name: "Pradeep" },
    { id: 7, name: "Moizu" },
    { id: 8, name: "Parth" },
];

app.get("/", (req, res) => {
    res.send("Welcome to Express!");
});

app.post("/data", (req, res) => {
    console.log("Received data:", req.body);
    res.send("Data received.");
});

app.get("/users", (req, res) => {
    res.json(users);
});

//  Made routes for '/', '/data', and '/users'. GET Methods for / and /users, and POST method for /data

app.get("/external-posts", async (req, res) => {
    try {
        const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching external posts:", error.message);
        res.status(500).send("Failed to fetch external posts.");
    }
});

//  Made route on GET method for /external-posts to get data from "jsonplaceholder.typicode.com/posts" Uses try and catch for error handling

app.use((req, res, next) => {
    res.status(404).send("Route not found.");
});

app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).send("Something went wrong!");
});

/*
    Made error handling routing. On any request for end url anything other than those that
    are declared send 404 with message "Route not found"
    On any other error send 500 error with message "Something went wrong!"
*/

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

// Listen to port 3000 on localhost