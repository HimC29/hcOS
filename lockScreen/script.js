import { getTime, getDate } from "../datetime.js";
import { getUser } from "../settings.js";

const clock = document.getElementById("clock");
const date = document.getElementById("date");
const userEl = document.getElementById("user");
const loginBtn = document.getElementById("login");

userEl.textContent = getUser();

setInterval(() => {
    clock.textContent = getTime();
    date.textContent = getDate();
}, 100);

loginBtn.addEventListener("click", () => {
    console.log("Logging in");
    sessionStorage.setItem("loggedIn", "true");
    window.location.href = "../homeScreen/index.html"
});