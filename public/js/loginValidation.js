

const form = document.getElementById("loginForm");


const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password")


function showError(input,message){
    const error = input.nextElementSibling
    error.innerText = message;
    input.classList.add("is-invalid")
}



function clearError(input){
    const error = input.nextElementSibling;
    error.innerText = ""
    input.classList.remove("is-invalid")
    input.classList.remove("input-error")
    
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



form.addEventListener("submit",function(e){
    e.preventDefault();

    const emailValid = validateEmail()
    const passwordValid = validatePassword();


    if(emailValid && passwordValid){
        form.submit()
    }
})


emailInput.addEventListener("input",validateEmail);
passwordInput.addEventListener("input",validatePassword);

