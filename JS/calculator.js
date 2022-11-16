const buttons = document.getElementsByTagName("button");
let num1 = "";
let num2 = "";
let oper = "";

for (let button = 0; button < buttons.length; button++) {
  buttons[button].addEventListener("click", (e) => {
    if (buttons[button].getAttribute("class") === "number") {
      if (oper) {
        num2 += buttons[button].getAttribute("id");
        console.log(num2);
      } else {
        num1 += buttons[button].getAttribute("id");
        console.log(num1);
      }
    } else if (buttons[button].getAttribute("class").includes("operator")) {
      if (oper) {
        oper = buttons[button].getAttribute("id");
        console.log(oper, num1, num2);
        console.log(num1 + oper + num2);
        num1 = eval(num1 + oper + num2);
        num2 = "";
      } else {
        oper = buttons[button].getAttribute("id");
        console.log(oper);
      }
    }
  });
}
