export function loadSettings(){
    const theme = localStorage.getItem("theme");
    if(theme) setTheme(theme);
    setUser(getUser());
}
export function setUser(user){
    if(!user || user.length < 3 || user.length > 20) return;
    localStorage.setItem("user", user);
}
export function getUser(){
    const user = localStorage.getItem("user");
    if(user) return user;
    return "guest";
}
export function setTheme(theme){
    if(theme === "light"){
        document.documentElement.setAttribute("data-theme","light");
        localStorage.setItem("theme", "light");
    }
    else if(theme === "dark"){
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }
}