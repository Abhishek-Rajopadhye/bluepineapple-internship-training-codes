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