import { setSettings } from "../../setSettings.js";

const lightMode = document.getElementById("lightMode");
const darkMode = document.getElementById("darkMode");

lightMode.addEventListener("click", () => {
    reqLoad();
    setSettings("light");
});
darkMode.addEventListener("click", () => {
    reqLoad();
    setSettings("dark");
});

function setTheme(theme){
    document.documentElement.setAttribute("data-theme", theme);
}

function reqLoad(){
    window.parent.postMessage("load", "*");
}