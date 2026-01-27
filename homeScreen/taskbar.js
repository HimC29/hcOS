import { getTime, getDate } from "../datetime.js";
import { openApp } from "./openApp.js";

let clockEl;
let dateEl;

export function initTaskbar(e, apps){
    clockEl = e.clock;
    dateEl = e.date;

    displayApps(e.taskbar, apps);

    updateDateTime();
    setInterval(updateDateTime, 1000);
}

function updateDateTime(){
    clockEl.textContent = getTime();
    dateEl.textContent = getDate();
}

function displayApps(appList, apps){
    function createImgOrEmoji(state, e){
        const newApp = document.createElement("div");
        newApp.classList.add("apps");
        newApp.id = e.id;

        appList.appendChild(newApp);

        if(state === "img"){
            const img = document.createElement("img");
            img.src = e.icon;
            newApp.appendChild(img);
        }
        else newApp.textContent = e.icon;

        newApp.addEventListener("click", () => {
            openApp(e);
        });
    }
    apps.forEach((e) => {
        if(e.icon.startsWith("./") || e.icon.startsWith("../")) createImgOrEmoji("img", e)
        else createImgOrEmoji("emoji", e)
    });
}