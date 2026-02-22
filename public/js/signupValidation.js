

const form = document.getElementById("signupForm");

const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const phoneInput = document.getElementById("phone")
const passwordInput = document.getElementById("password")
const confirmPasswordInput = document.getElementById("confirmPassword")



function showError(input,message){
    const error = input.nextElementSibling
    error.innerText = message;
    input.classList.add("is-invalid")
}


function clearError(input){
    const error = input.nextElementSibling;
    if(error) error.innerText = "";

    input.classList.remove("is-invalid");
    input.classList.remove("input-error");
}


function validateName(){
    const value = nameInput.value.trim();

    if(value===""){
         showError(nameInput,"Name is required");
         return false;
    }

    if(value.length < 3){
        showError(nameInput,"Name must be atleast 3 charactors")
        return false;
    }

    clearError(nameInput)
    return true
}


function validateEmail(){
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(emailInput.value.trim()===""){
        showError(emailInput,"Email is required")
        return false;
    }

    if(!regex.test(emailInput.value) ){
        showError(emailInput,"Enter a valid email")
        return false;
    }

    clearError(emailInput);
    return true

}


function validatePhone(){
    const regex = /^[0-9]{10}$/;

    if(phoneInput.value.trim()===""){
        showError(phoneInput,"Phone is required")
        return false
    }

    if(!regex.test(phoneInput.value)){
        showError(phoneInput,"Number must be at least 10 digits")
        return false;
    }

    clearError(phoneInput)
    return true

}


function validatePassword(){
    if(passwordInput.value===""){
        showError(passwordInput,"Password is required")
        return false;
    }

    if(passwordInput.value.length < 6){
        showError(passwordInput,"Password must be at least 6 charactors")
        return false
    }

    clearError(passwordInput)
    return true;
}


function validateConfirmPassword(){
    if(confirmPasswordInput.value===""){
        showError(confirmPasswordInput,"Confirm password is required")
        return false;
    }

    

    if(confirmPasswordInput.value!==passwordInput.value){
        showError(confirmPasswordInput,"Password is not matching")
        return false
    }

    clearError(confirmPasswordInput)
    return true
}



form.addEventListener("submit",function(e){
    e.preventDefault();


    const nameValid = validateName();
    const emailValid = validateEmail();
    const phoneValid = validatePhone();
    const passwordValid = validatePassword();
    const confirmPasswordValid = validateConfirmPassword();

    if(nameValid &&
        emailValid &&
        phoneValid &&
        passwordValid &&
        confirmPasswordValid
    ){
        form.submit()
    }
})


nameInput.addEventListener("input",validateName)
emailInput.addEventListener("input",validateEmail)
phoneInput.addEventListener("input",validatePhone)
passwordInput.addEventListener("input",validatePassword)
confirmPasswordInput.addEventListener("input",validateConfirmPassword)



document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", () => {
    input.classList.remove("input-error");
  });
});