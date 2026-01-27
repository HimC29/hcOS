import { setUser, getUser, setTheme } from "../../settings.js";

const userInfo = document.getElementById("userInfo");
const userInput = document.getElementById("userInput");
const userError = document.getElementById("userError");
const lightMode = document.getElementById("lightMode");
const darkMode = document.getElementById("darkMode");
let userName = getUser();
userInfo.textContent = `User: ${userName}`;
userInput.value = userName;

userInput.addEventListener("change", () => {
    const user = userInput.value;
    if(user.length < 3){
        userError.textContent = "User needs to be 3 or more characters.";
        return;
    }
    else if(user.length > 20){
        userError.textContent = "User needs to be 20 or less characters.";
        return;
    }

    const allowedChars = /^[A-Za-z0-9_]+$/;
    if(allowedChars.test(user)){
        userError.textContent = "";
        userName = userInput.value;
        setUser(userName);
        userInfo.textContent = `User: ${userName}`;
    }
    else{
        userError.textContent = "User can only contain letters, numbers, and underscores.";
        return;
    }
});

lightMode.addEventListener("click", () => {
    reqLoad();
    setTheme("light");
});
darkMode.addEventListener("click", () => {
    reqLoad();
    setTheme("dark");
});

function reqLoad(){
    window.parent.postMessage("load", "*");
}