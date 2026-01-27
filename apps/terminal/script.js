import { getUser } from "../../settings.js";
import { getTerminalStdout } from "./terminalCommands.js";
const terminal = document.querySelector(".terminal");

newLine();
function newLine(){
    const line = document.createElement("div");
    line.className = "line";
    terminal.appendChild(line);

    const span = document.createElement("span");
    span.textContent = `${getUser()}@hc!OS:~$\u00A0`;
    line.appendChild(span);
    
    const input = document.createElement("textarea");
    input.className = "terminal-input";
    line.appendChild(input);

    input.addEventListener("input", () => {
        input.style.height = "1.5em";
        input.style.height = input.scrollHeight + "px";
    });

    input.addEventListener("keydown", (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
            input.readOnly = true;
            doCommand(input.value);
        }
    });

    input.focus();
    document.addEventListener("keydown", (e) => {
        if(e == "Enter"){} else input.focus();
    });
}
function doCommand(command){

    if (command === "") {
        newLine();
        return;
    }

    const stdoutEl = document.createElement("div");
    stdoutEl.className = "stdout";
    stdoutEl.style.whiteSpace = "pre-wrap";
    stdoutEl.textContent = getTerminalStdout(command);
    terminal.appendChild(stdoutEl);
    newLine();
}
