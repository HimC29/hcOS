const display = document.getElementById("display");
let userInputs = [];
let calculated = false;
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
    // If we just calculated and the new input is a number, clear and start fresh
    if(calculated && !isNaN(input)){
        clearDisplay();
    }
    // If an operator is pressed after a calculation, don't clear, just reset the flag
    if(calculated && isNaN(input)){
        calculated = false;
    }
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
    calculated = true;
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