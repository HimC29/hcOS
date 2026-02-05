const terminalCommands = 
{
    echo: (args) => {return args.join(" ")},
    help: "help - Shows available commands\naboutOS - Shows current OS",
    aboutOS: "hc!OS Beta2"
};

export function getTerminalStdout(unformattedCommand){
    const command = unformattedCommand.trim();
    if(command === ""){
        return;
    }
    const parts = command.split(" ");
    const cmd = parts[0];
    const args = parts.slice(1);

    const funcOrString = terminalCommands[cmd];

    if(typeof funcOrString === "function") return funcOrString(args);
    else if(typeof funcOrString === "string") return funcOrString;
    else return `Invalid command: "${cmd}"`;
    /*
    switch(cmd){
        case "echo":
            return args.join(" ");
        case "help":
            return
    }*/
}
