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
        throw new Error(error);
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