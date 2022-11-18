const buttons = document.getElementsByTagName("button");
let num1 = "";
let num2 = "";
let oper = "";
const display = document.getElementById("screen");
for (let button = 0; button < buttons.length; button++) {
  buttons[button].addEventListener("click", (e) => {
    calcul(e.target);
  });
}

function calcul(button) {
  if (button.getAttribute("class") === "number") {
    if (oper) {
      num2 += button.getAttribute("id");
      display.innerHTML = num1 + oper + num2;
    } else {
      num1 += button.getAttribute("id");
      display.innerHTML = num1;
    }
  } else if (button.getAttribute("class").includes("operator")) {
    if (oper && num2) {
      num1 = eval(num1 + oper + num2);
      oper = button.getAttribute("id");
      num2 = "";
      display.innerHTML = num1 + oper;
    } else {
      oper = button.getAttribute("id");
      display.innerHTML = num1 + oper;
    }
  } else if (button.getAttribute("id") === "c") {
    display.innerHTML = "";
    num1 = "";
    num2 = "";
    oper = "";
  } else if (button.getAttribute("id") === "=") {
    if (num1 && num2 && oper) {
      display.innerHTML = eval(num1 + oper + num2);
      num1 = eval(num1 + oper + num2);
      oper = "";
      num2 = "";
    }
  } else if (button.getAttribute("id") === ".") {
    if (!oper && !num1.includes(".")) {
      num1 = num1 + ".";
      display.innerHTML = num1;
    } else if (!num2.includes(".") && oper) {
      num2 = num2 + ".";
      display.innerHTML = num1 + oper + num2;
    }
  } else if (button.getAttribute("id") === "back") {
    if (num2) {
      num2 = num2.slice(0, -1);
      display.innerHTML = num1 + oper + num2;
    } else if (oper) {
      oper = "";
      display.innerHTML = num1 + oper + num2;
    } else {
      num1 = num1.slice(0, -1);
      display.innerHTML = num1 + oper + num2;
    }
  }
}
