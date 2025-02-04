let array1 = [];

for (let i = 0; i < 10; i++) {
    let n = Math.floor(Math.random() * (100)) + 1;
    array1.push(n);
}

console.log("ARRAY: " + array1);

function findLargestAndSmallest(array){
    let largest = array[0];
    let smallest = array[0];
    let sum = 0;

    array.forEach(element => {
        if(element > largest){
            largest = element;
        }
        if(element < smallest){
            smallest = element;
        }
        sum += element;
    });
    
    console.log("Largest: " + largest);
    console.log("Smallest: " + smallest);
    console.log("Average: " + sum/array.length);
}

findLargestAndSmallest(array1);