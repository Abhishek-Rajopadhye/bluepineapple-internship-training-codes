/*
    Assignment 2: File System and Event Loop 
    Objective: Learn how to work with the file system, understand the event loop, and implement non-blocking code. 
        Use the fs module to: 
            Create a new file named log.txt with content: "This is a log file." 
            Append new logs to the file every time the script runs. 
        Simulate blocking vs. non-blocking: 
            Write a blocking function that reads log.txt synchronously and logs its content. 
            Write a non-blocking function that reads log.txt asynchronously and logs its content. 
        Use setTimeout, setImmediate, and process.nextTick to demonstrate how the event loop handles tasks. Add a console log to show their execution order. 
*/

const fs = require('fs');
if(fs.existsSync('log.txt')) {
    fs.appendFile('log.txt', '\nNew log', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Log added');
        }
    });    
}
else{
    fs.writeFile('log.txt', 'This is a log file.', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('File created');
        }
    });    
}    

function blockingFunction() {
    const data = fs.readFileSync('log.txt', 'utf8');
    console.log('Blocking function:', data);
}

async function nonBlockingFunction() {
    const data = await fs.readFileSync('log.txt', 'utf8');
    console.log('Non-Blocking function:', data);
}

blockingFunction();
nonBlockingFunction();

setTimeout(() => {
    console.log('setTimeout');
}, 0);

setImmediate(() => {
    console.log('setImmediate');
});

process.nextTick(() => {
    console.log('process.nextTick');
});

function demonstrateEventLoop() {
    setTimeout(() => console.log('setTimeout executed'), 0);
    setImmediate(() => console.log('setImmediate executed'));
    process.nextTick(() => console.log('process.nextTick executed'));
}

demonstrateEventLoop();