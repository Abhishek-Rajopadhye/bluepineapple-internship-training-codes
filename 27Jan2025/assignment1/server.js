/*
    Assignment 1: Node.js Basics 
    Objective: Understand Node.js modules, require, exports, and the basics of creating a server. 
        Create a Node.js file called server.js: 
            Import the http module using require. 
            Create a server that listens on port 3000 and responds with "Welcome to Node.js!" for any request. 
*/

const http = require('http');
const helper = require('./helper');

const server = http.createServer((req, res) =>{
    console.log(helper.getMessage());
    res.end('Welcome to Node.js!');
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});


/*
    Create a server using http
    It will print "Server is running on http://localhost:3000/" on server creation
    Server will listen to port 3000
    On request, print "Welcome to Node.js!", and use helper getMessage function to print in console.
*/