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
    let element = e.target as HTMLElement;
    calcul(element);
  });
}

function calcul(button: Element) {
  if (button.getAttribute("class") === "number") {
    //check if num1 or num2
    if (oper) {
      num2 += button.getAttribute("id");
      display.innerHTML = num1 + oper + num2;
    } else {
      num1 += button.getAttribute("id");
      display.innerHTML = num1;
    }
  } else if (button.getAttribute("class").includes("operator")) {
    if (
      //not allowed to put * or / if there no numbers
      (button.getAttribute("id") === "*" ||
        button.getAttribute("id") === "/") &&
      !num1
    ) {
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
        } else {
          num1 = eval(num1 + oper + num2);
          oper = button.getAttribute("id");
          num2 = "";
          oper2 = "";
          display.innerHTML = num1 + oper;
        }
      } else {
        num1 = eval(num1 + oper + num2);
        oper = button.getAttribute("id");
        num2 = "";
        display.innerHTML = num1 + oper;
      }
    } else {
      oper = button.getAttribute("id");
      display.innerHTML = num1 + oper;
    }
  } else if (button.getAttribute("id") === "c") {
    //clear button
    display.innerHTML = "";
    num1 = "";
    num2 = "";
    oper = "";
    oper2 = "";
  } else if (button.getAttribute("id") === "=") {
    //equal button
    if (num1 && num2 && oper) {
      display.innerHTML = eval(num1 + oper + num2);
      num1 = eval(num1 + oper + num2);
      oper = "";
      num2 = "";
      oper2 = "";
    }
  } else if (button.getAttribute("id") === ".") {
    //dot button
    if (!oper && !num1.includes(".")) {
      num1 = num1 + ".";
      display.innerHTML = num1;
    } else if (!num2.includes(".") && oper) {
      num2 = num2 + ".";
      display.innerHTML = num1 + oper + num2;
    }
  } else if (button.getAttribute("id") === "back") {
    // back button
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

const bulb = document.getElementById("bulb");
bulb.addEventListener("click", () => {
  //document.body.classList.toggle("dark");
  document.getElementById("screen").classList.toggle("screenBGC");
  flagBulb = !flagBulb;
  if (flagBulb) {
    bulb.style.backgroundColor = "red";
  } else {
    bulb.style.backgroundColor = "revert-layer";
  }
});

const scientific = document.getElementById("scientific");
scientific.addEventListener("click", () => {
  flagSci = !flagSci;
  num1 = "";
  num2 = "";
  oper = "";
  oper2 = "";
  display.innerHTML = "";
  if (flagSci) {
    scientific.style.backgroundColor = "red";
    document.getElementById("right-container").style.display = "block";
  } else {
    scientific.style.backgroundColor = "revert-layer";
    document.getElementById("right-container").style.display = "none";
  }
});

const hist = document.getElementById("hist");
hist.addEventListener("click", () => {
  flagHis = !flagHis;
  if (flagHis) {
    hist.style.backgroundColor = "red";
    document.getElementById("left-container").style.display = "block";
  } else {
    hist.style.backgroundColor = "revert-layer";
    document.getElementById("left-container").style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.search) {
    const search = new URLSearchParams(window.location.search);
    document.body.style.backgroundColor = search.get("color");
    document.body.style.fontFamily = search.get("font");
    document.body.classList.toggle(search.get("mode"));
  }
});