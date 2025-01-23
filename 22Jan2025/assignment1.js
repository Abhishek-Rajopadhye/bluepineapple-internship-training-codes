let myName="Abhishek Rajopadhye";
let age=28;
let isStudent=true;
let hobbies=["Reading","Coding","Gaming","Drawing"];
let details = {
    "Name":myName,
    "Age":age,
    "IsStudent":isStudent,
    "Hobbies":hobbies
};

console.log("Name: " + myName);
console.log("Age: " + age);
console.log("Is Student: " + isStudent);
console.log("Hobbies: ");
hobbies.forEach(element => {
    console.log(element);
});
console.log("Details Obj:", details);