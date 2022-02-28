// number display area
// result of calculation, showing last number pressed, until you press equals "="
// when equals is pressed, the calculation goes up, and result is displayed below

// calculation -->
// 1. if it's / or x ==>
// get the operator before this operator, if it's + or -
// get the numbers before and after the operator in the array
// e.g. [1, x, 3]

// get the operator before this operator, if it's x or / or =
// do normal calculation flow
// 2. if it's + / -, do normal calculation flow
// 3. if = pressed, perform calculation and store the result as the first value in the array
// 4. if AC pressed, clear everything

const display = document.querySelector(".display");
const numpad = document.querySelector(".numpad");
const currentDisplayValue = document.querySelector(".displayLive");
const currentDisplayHistory = document.querySelector(".displayHistory");

const keys = ["AC", "/", "*", 7, 8, 9, "-", 4, 5, 6, "+", 1, 2, 3, "=", 0, "."];
const operators = [1, 2, 6, 10];
const operatorValues = ["/", "*", "-", "+"];
const functions = [0, 14];

let wholeNumbers = [];
let digits = [];

// add buttons
function addButtons() {
  for (let i = 0; i < keys.length; i++) {
    const el = document.createElement("div");
    el.innerHTML = keys[i];
    el.classList.add("key");
    // add operator classes
    if (operators.includes(i)) {
      el.classList.add("operator");
    }
    // add function classes
    if (functions.includes(i)) {
      el.classList.add("function");
    }

    // add ac class and event listener
    if (i === 0) {
      el.classList.add("ac");
      el.addEventListener("click", pressAC);
    }

    // add zero class and event listener
    else if (i === 15) {
      el.classList.add("zero");
      el.addEventListener("click", pressNumber);
    }

    // add equal class and event listener
    else if (i === 14) {
      el.classList.add("equal");
      el.addEventListener("click", pressEquals);
    }

    // add operator event listener
    else if (operators.includes(i)) {
      el.addEventListener("click", pressOperator);
    } else {
      el.addEventListener("click", pressNumber);
    }

    numpad.appendChild(el);
  }
}

// function to clear display
function pressAC() {
  wholeNumbers = [];
  digits = [];
  currentDisplayValue.innerHTML = 0;
  currentDisplayHistory.innerHTML = "";
}

// function to press numbers
function pressNumber(i) {
  if (digits.includes(".") && i.target.innerHTML === ".") {
    return;
  } else if (i.target.innerHTML === ".") {
    digits.push(0, i.target.innerHTML);
    currentDisplayValue.innerHTML = i.target.innerHTML;
    currentDisplayHistory.innerHTML = wholeNumbers.join("") + digits.join("");
  } else {
    digits.push(i.target.innerHTML);
    currentDisplayValue.innerHTML = i.target.innerHTML;
    currentDisplayHistory.innerHTML = wholeNumbers.join("") + digits.join("");
  }
}

// function to operate on 2 numbers + - * /
function pressOperator(i) {
  if (digits.length !== 0) {
    let a = parseFloat(digits.join(""));
    wholeNumbers.push(a);
  }
  digits = [];

  let b = wholeNumbers.length - 1;
  if (operatorValues.includes(wholeNumbers[b]) && operatorValues.includes(i.target.innerHTML)) {
    wholeNumbers.pop();
    wholeNumbers.push(i.target.innerHTML);
  } else {
    wholeNumbers.push(i.target.innerHTML);
    currentDisplayValue.innerHTML = i.target.innerHTML;
    currentDisplayHistory.innerHTML = wholeNumbers.join("");
  }
}

// function to equal
function pressEquals(i) {
  if (digits.length !== 0) {
    let a = parseFloat(digits.join(""));
    wholeNumbers.push(a);
  }
  digits = [];

  for (let m = 1; m < wholeNumbers.length; m++) {
    let newNumber = 0;

    switch (wholeNumbers[1]) {
      case "+":
        newNumber = Number(wholeNumbers[0]) + Number(wholeNumbers[2]);
        wholeNumbers.pop(wholeNumbers[0], wholeNumbers[1], wholeNumbers[2]);
        wholeNumbers.unshift(newNumber);
        console.log("yes");

        break;
      case "-":
        newNumber = wholeNumbers[0] - wholeNumbers[2];
        wholeNumbers.pop(wholeNumbers[0], wholeNumbers[1], wholeNumbers[2]);
        wholeNumbers.unshift(newNumber);

        break;
      case "*":
        newNumber = wholeNumbers[0] * wholeNumbers[2];
        wholeNumbers.pop(wholeNumbers[0], wholeNumbers[1], wholeNumbers[2]);
        wholeNumbers.unshift(newNumber);

        break;
      case "/":
        newNumber = wholeNumbers[0] / wholeNumbers[2];
        wholeNumbers.pop(wholeNumbers[0], wholeNumbers[1], wholeNumbers[2]);
        wholeNumbers.unshift(newNumber);

        break;
    }
    console.log(wholeNumbers);
  }
}

function start() {
  addButtons();
  currentDisplayValue.innerHTML = 0;
}

start();
