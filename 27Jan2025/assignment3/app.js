/*
    Assignment 3: Function Chaining and Promises 
    Objective: Practice chaining methods and working with promises. 
        Create a Calculator class:
            Add methods add(num), subtract(num), multiply(num), and divide(num). 
            Each method should update the internal value and return this to allow chaining. 
            Include a getResult() method to retrieve the final result. 
            Example:
                const calc = new Calculator(); 
                calc.add(5).subtract(2).multiply(3).divide(2).getResult(); // Output: 4.5 
        Implement a function fetchData() that: 
            Returns a promise simulating an API call with setTimeout. 
            Resolves with "Data fetched successfully" after 2 seconds or rejects with an error message if something goes wrong. 
            Use .then() and .catch() to handle the promise. 
*/

class Calculator {
    constructor() {
        this.result = 0;
    }

    add(num) {
        this.result += num;
        return this;
    }

    subtract(num) {
        this.result -= num;
        return this;
    }

    multiply(num) {
        this.result *= num;
        return this;
    }

    divide(num) {
        this.result /= num;
        return this;
    }

    getResult() {
        return this.result;
    }
}

const calc = new Calculator();

console.log(calc.add(5).subtract(2).multiply(3).divide(2).getResult());

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve('Data fetched successfully');
            } else {
                reject('Error fetching data');
            }
        }, 2000);
    });
}

fetchData()
.then((data) => {
    console.log(data);
})
.catch((error) => {
    console.log(error);
});



