const form = document.querySelector(".js-form"),
      input = form.querySelector("input"),
      greeting = document.querySelector(".js-greetings");

const User_LS = "currentUser",
      Showing_CN = "showing";

function handleSubmit (event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function saveName(text){
    localStorage.setItem(User_LS, text);
}

function askName() {
    form.classList.add(Showing_CN);
    form.addEventListener("submit",handleSubmit)
}

function paintGreeting(text){
    form.classList.remove(Showing_CN);
    greeting.classList.add(Showing_CN);
    greeting.innerText = `Hello, ${text}!`;
}

function loadName() {
    const currentUser = localStorage.getItem(User_LS);
    if(currentUser === null) {
        askName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();