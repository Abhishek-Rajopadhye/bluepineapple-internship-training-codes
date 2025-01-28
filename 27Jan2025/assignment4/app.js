/*
    Assignment 4: Async/Await and API Integration 
    Objective: Work with async/await and understand how to handle asynchronous operations in Node.js. 
        Modify the fetchData() function from Assignment 3: 
            Rewrite it using async/await. 
            Include error handling with try/catch. 
        Fetch data from a public API:
            Use the node-fetch or axios package to fetch JSON data from https://jsonplaceholder.typicode.com/posts. 
            Write an async function getPosts() to:  
                Fetch the posts. 
                Log the first 5 posts with their title and body. 
        Simulate multiple API calls: 
            Fetch data from two different endpoints of the API in parallel (e.g., /posts and /comments). 
            Use Promise.all to wait for both responses and log the results. 
*/

axios = require('axios');

async function fetchData() {
    try {
        const result = await new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    resolve('Data fetched successfully');
                } else {
                    reject('Error fetching data');
                }
            }, 2000);
        });
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

fetchData();

async function getPosts() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data.slice(0, 5);
    posts.forEach(post => {
        console.log(`Title: ${post.title}\nBody: ${post.body}\n`);
    });
}

async function getComments() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
    const comments = response.data.slice(0, 5);
    comments.forEach(comment => {
        console.log(`Name: ${comment.name}\nEmail: ${comment.email}\n`);
    });
}

Promise.all([getPosts(), getComments()]);

/*
    Modified fetchData to make use of try and catch instead of then and catch. Functionality is similar to before.
    getPosts and getComments make use of axios to get data from external site "jsonplaceholder.typicode.com". Using
    slice command get only first 5 of the resulting data receieved.
    Then print the 5 posts/comments to console.
    Promise.all is used with getPosts() and getComments() in a list/array as its parameters. This will use promise resolve, reject
    functionality for both the functions.
*/