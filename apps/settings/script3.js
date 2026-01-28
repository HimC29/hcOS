import { setUser, getUser, setTheme } from "../../settings.js";
import { idbFuncs } from "../../idbFuncs.js";

const userInfo = document.getElementById("userInfo");
const userInput = document.getElementById("userInput");
const userError = document.getElementById("userError");
const lightMode = document.getElementById("lightMode");
const darkMode = document.getElementById("darkMode");
const wallpaperFileInput = document.getElementById("wallpaperFileID");
let userName = getUser();
userInfo.textContent = `User: ${userName}`;
userInput.value = userName;

await idbFuncs.openDB("myOSDB", 2, [
    { name: "wallpaper", keyPath: "id" }
]);

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

wallpaperFileInput.addEventListener("change", async () => {
    const file = wallpaperFileInput.files[0];
    if (!file) return;

    const savedData = { id: "wallpaper", data: file };
    await idbFuncs.set("wallpaper", { id: "wallpaper", data: file });
    window.parent.postMessage({ type: "wallpaperUpdate", detail: savedData }, "*");
});

function reqLoad(){
    window.parent.postMessage("load", "*");
}