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
    apps.forEach((e) => {
        const newApp = document.createElement("div");
        newApp.classList.add("apps");
        newApp.id = e.id;
        newApp.textContent = e.icon;
        appList.appendChild(newApp);

        newApp.addEventListener("click", () => {
            openApp(e);
        });
    });
}