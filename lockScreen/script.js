import { getTime, getDate } from "../datetime.js";

const clock = document.getElementById("clock");
const date = document.getElementById("date");
const loginBtn = document.getElementById("login");

console.log("Started");

setInterval(() => {
    clock.textContent = getTime();
    date.textContent = getDate();
}, 100);

loginBtn.addEventListener("click", () => {
    console.log("Logging in");
    sessionStorage.setItem("loggedIn", "true");
    window.location.href = "../homeScreen/index.html"
});