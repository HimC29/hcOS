const display = document.getElementById("display");
let userInputs = [];
display.value = "Calculator"

function formatInputForScreen(userInputs){
    let formattedUserInputs = "";
    for(const input of userInputs){
        if(input === "Math.sqrt"){
            formattedUserInputs += "√";
        }
        else if(input === "**2"){
            formattedUserInputs += "²";
        }
        else if(input === "*"){
            formattedUserInputs += "×";
        }
        else if(input === "/"){
            formattedUserInputs += "÷";
        }
        else{
            formattedUserInputs += input;
        }
    }
    console.log(formattedUserInputs);
    return formattedUserInputs;
}

function displayToScreen(){
    display.value = formatInputForScreen(userInputs);

    display.focus();
    display.selectionStart = display.selectionEnd = display.value.length;
}

function appendToken(input){
    userInputs.push(input);
    displayToScreen();
    console.log(userInputs);
}

function clearDisplay(){
    userInputs.length = 0;
    display.value = "";
    console.log(userInputs);
}

function delLastDigit(){
    userInputs.pop();
    displayToScreen();
    console.log(userInputs);
}

function calculate(){
    let formattedEquation = "";
    let sqrtActive = false;
    for(const input of userInputs){
        if(input === "Math.sqrt"){
            formattedEquation += "Math.sqrt(";
            sqrtActive = true;
        }
        else if(sqrtActive) {
            if(!isNaN(input)) {
                formattedEquation += input;
            }
            else{ 
                formattedEquation += ")" + input;
                sqrtActive = false;
            }
        }
        else{
            formattedEquation += input;
        }
    }
    if (sqrtActive) formattedEquation += ")";
    console.log(formattedEquation)

    try{
        userInputs.length = 0; 
        userInputs = [eval(formattedEquation)];
        display.value = userInputs;
    }
    catch(error){
        display.value = "Syntax Error";
        console.error(error);
    }
}