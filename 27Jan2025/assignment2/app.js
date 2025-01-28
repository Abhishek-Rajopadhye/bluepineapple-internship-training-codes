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

/*
    Using fs module check if log.txt exists or not.
    If exists then append "\nNew Log" to log file and check if it was successful or not. Print in console the status.
    If it doesn't exist, create a log.txt file and add "This is a log file" as first line. Print in console the status.
*/

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

/*
    1.blockingFunction() is not asynchronous and does not use await. As such the program will have to wait for execution of all steps
    within the function before returning. This blocks the program execution until its completion.
    2.nonBlockingFunction() is asynchronous and uses event loop to allow for the program to continue execution of
    further steps. On repsonse from await process the program will return to the function and execute the remaining steps. This allows
    for program to continue unblocked.
*/

function demonstrateEventLoop() {
    setTimeout(() => console.log('setTimeout executed'), 0);
    setImmediate(() => console.log('setImmediate executed'));
    process.nextTick(() => console.log('process.nextTick executed'));
}

demonstrateEventLoop();

/*
    Using demonstrateEventLoop() calling the event loop handlers.
    setTimeout will wait x ticks to execute the given command(s).
    setImmediate will be executed immediately after reaching the command.
    process.nextTick will execute on next tick of program.
*/