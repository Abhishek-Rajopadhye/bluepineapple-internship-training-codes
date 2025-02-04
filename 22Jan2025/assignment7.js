document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let age = document.getElementById("age").value;
    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let ageError = document.getElementById("ageError");

    let errorMessages = 0;
    if(name === ""){
        nameError.innerText = "Name is required";
        errorMessages += 1;
    }

    if(email === ""){
        emailError.innerText = "Email is required";
        errorMessages += 1;
    } else{
        let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!emailPattern.test(email)){
            emailError.innerText = "Email is not valid";
        }
        errorMessages += 1;
    }

    if(age !== ""){
        if(age < 18){
            ageError.innerText = "Age should be greater than 18";
        }
        errorMessages += 1;
    }

    if(errorMessages > 0){
        document.getElementById("formError").innerText= "Please correct the errors";
    } else{
        error.innerHTML = "";
        document.getElementById("form").submit();
    }
});