/*
    Assignment 1: Node.js Basics 
    Objective: Understand Node.js modules, require, exports, and the basics of creating a server.
        Create a module named helper.js: 
            Export a function getMessage() that returns "Hello from the helper module!". 
            Import helper.js into server.js and log the message in the console
*/

function getMessage() {
    return 'Hello from the helper module!';
}

module.exports = {
    getMessage: getMessage
};
