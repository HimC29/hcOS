export function setSettings(setting){
    setTheme(setting);
}
export function loadSettings(){
    const theme = localStorage.getItem("theme");
    if(theme) setTheme(theme);
}
function setTheme(theme){
    if(theme === "light"){
        document.documentElement.setAttribute("data-theme","light");
        localStorage.setItem("theme", "light");
    }
    else if(theme === "dark"){
        document.documentElement.setAttribute("data-theme","dark");
        localStorage.setItem("theme", "dark");
    }
}