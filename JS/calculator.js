const buttons = document.getElementsByTagName("button");
let num1 = "";
let num2 = "";
let oper = "";
let oper2 = "";
let flagSci = false;
let flagHis = false;
let flagBulb = false;
const display = document.getElementById("screen");
for (let button = 0; button < buttons.length; button++) {
    buttons[button].addEventListener("click", (e) => {
        let element = e.target;
        calcul(element);
    });
}
function calcul(button) {
    if (button.getAttribute("class") === "number") {
        //check if num1 or num2
        if (oper) {
            num2 += button.getAttribute("id");
            display.innerHTML = num1 + oper + num2;
        }
        else {
            num1 += button.getAttribute("id");
            display.innerHTML = num1;
        }
    }
    else if (button.getAttribute("class").includes("operator")) {
        if (
        //not allowed to put * or / if there no numbers
        (button.getAttribute("id") === "*" ||
            button.getAttribute("id") === "/") &&
            !num1) {
            return;
        }
        if (oper && num2) {
            if (flagSci) {
                if (oper2 === "") {
                    num1 = num1 + oper + num2;
                    oper2 = oper;
                    oper = button.getAttribute("id");
                    num2 = "";
                    display.innerHTML = num1 + oper;
                }
                else {
                    createHistory();
                    num1 = eval(num1 + oper + num2);
                    oper = button.getAttribute("id");
                    num2 = "";
                    oper2 = "";
                    display.innerHTML = num1 + oper;
                }
            }
            else {
                num1 = eval(num1 + oper + num2);
                createHistory();
                oper = button.getAttribute("id");
                num2 = "";
                display.innerHTML = num1 + oper;
            }
        }
        else {
            oper = button.getAttribute("id");
            display.innerHTML = num1 + oper;
        }
    }
    else if (button.getAttribute("id") === "c") {
        //clear button
        clearHistory();
        display.innerHTML = "";
        num1 = "";
        num2 = "";
        oper = "";
        oper2 = "";
    }
    else if (button.getAttribute("id") === "=") {
        //equal button
        if (num1 && num2 && oper) {
            display.innerHTML = eval(num1 + oper + num2);
            createHistory();
            num1 = eval(num1 + oper + num2);
            oper = "";
            num2 = "";
            oper2 = "";
        }
    }
    else if (button.getAttribute("id") === ".") {
        //dot button
        if (!oper && !num1.includes(".")) {
            num1 = num1 + ".";
            display.innerHTML = num1;
        }
        else if (!num2.includes(".") && oper) {
            num2 = num2 + ".";
            display.innerHTML = num1 + oper + num2;
        }
    }
    else if (button.getAttribute("id") === "back") {
        // back button
        if (num2) {
            num2 = num2.slice(0, -1);
            display.innerHTML = num1 + oper + num2;
        }
        else if (oper) {
            oper = "";
            display.innerHTML = num1 + oper + num2;
        }
        else {
            num1 = num1.slice(0, -1);
            display.innerHTML = num1 + oper + num2;
        }
    }
}
