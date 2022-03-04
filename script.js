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

const calculator = document.querySelector(".calculator");
const display = document.querySelector(".display");
const numpad = document.querySelector(".numpad");
const currentDisplayValue = document.querySelector(".displayLive");
const currentDisplayHistory = document.querySelector(".displayHistory");

const keys = ["AC", "/", "x", 7, 8, 9, "-", 4, 5, 6, "+", 1, 2, 3, "=", 0, "."];
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
      el.classList.add("number");
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
      el.classList.add("number");
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
  } else if (i.target.innerHTML === "." && digits.length === 0) {
    digits.push(0, i.target.innerHTML);
    currentDisplayValue.innerHTML = i.target.innerHTML;
    currentDisplayHistory.innerHTML = wholeNumbers.join("") + digits.join("");
  } else {
    digits.push(i.target.innerHTML);
    currentDisplayValue.innerHTML = i.target.innerHTML;
    currentDisplayHistory.innerHTML = wholeNumbers.join("") + digits.join("");
  }
}

// function to check whether 1) there is digits to be pushed to wholeNumbers array 2) if there is a negative digit entered as the first number
function checkDigits() {
  let a;
  if (digits.length !== 0) {
    if (wholeNumbers.length === 1 && wholeNumbers[0] === "-") {
      digits.unshift(wholeNumbers[0]);
      wholeNumbers = [];
    }
    a = parseFloat(digits.join(""));
    wholeNumbers.push(a);
  }
  digits = [];
}

// function to operate on 2 numbers + - * /
function pressOperator(i) {
  checkDigits();

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
let newNumber = 0;

function pressEquals(i) {
  checkDigits();

  // when = is pressed and there is only 1 number, then return that number and clear history
  if (wholeNumbers.length === 1) {
    currentDisplayValue.innerHTML = wholeNumbers[0];
    currentDisplayHistory.innerHTML = "";
    return;
  }

  // for loop to go through all the operators in the wholeNumbers array
  let newWholeNumbers;
  newWholeNumbers = wholeNumbers.map((x) => x);

  for (let m = 0; m < wholeNumbers.length; m += 2) {
    // set the index in an array for multiplier and division priorities
    let operatorBeforeM = m - 1;
    let numberBeforeM = m;
    let twoNumberBeforeM = m - 2;

    // go through all the calculations needed in the wholeNumbers array
    switch (wholeNumbers[1]) {
      case "+":
        newNumber = Number(wholeNumbers[0]) + Number(wholeNumbers[2]);
        updateWholeNumbers();
        break;
      case "-":
        newNumber = Number(wholeNumbers[0]) - Number(wholeNumbers[2]);
        updateWholeNumbers();
        break;
      case "x":
        // check whether the operator before the current operator is a + or - and undo the previous calculation to priotize the current multiplier
        if (newWholeNumbers[operatorBeforeM] === "+" || newWholeNumbers[operatorBeforeM] === "-") {
          // remove 1st number in the wholeNumbers array (undo the result) and bring back the second number in the last round of calculation
          wholeNumbers.shift();
          wholeNumbers.unshift(newWholeNumbers[numberBeforeM]);
          // perform mulitplier calculation
          newNumber = Number(wholeNumbers[0]) * Number(wholeNumbers[2]);
          updateWholeNumbers();
          // bring back the first number and the operator in the last round of calculation
          wholeNumbers.unshift(newWholeNumbers[operatorBeforeM]);
          wholeNumbers.unshift(newWholeNumbers[twoNumberBeforeM]);
          // decrease m by 2 to get 1 more round of calculation
          m = m - 2;
        } else {
          newNumber = Number(wholeNumbers[0]) * Number(wholeNumbers[2]);
          updateWholeNumbers();
        }
        break;
      case "/":
        // check whether the operator before the current operator is a + or - and undo the previous calculation to priotize the current division
        if (newWholeNumbers[operatorBeforeM] === "+" || newWholeNumbers[operatorBeforeM] === "-") {
          // remove 1st number in the wholeNumbers array (undo the result) and bring back the second number in the last round of calculation
          wholeNumbers.shift();
          wholeNumbers.unshift(newWholeNumbers[numberBeforeM]);
          // perform mulitplier calculation
          newNumber = Number(wholeNumbers[0]) / Number(wholeNumbers[2]);
          updateWholeNumbers();
          // bring back the first number and the operator in the last round of calculation
          wholeNumbers.unshift(newWholeNumbers[operatorBeforeM]);
          wholeNumbers.unshift(newWholeNumbers[twoNumberBeforeM]);
          // decrease m by 2 to get 1 more round of calculation
          m = m - 2;
        } else {
          newNumber = Number(wholeNumbers[0]) / Number(wholeNumbers[2]);
          updateWholeNumbers();
        }
        break;
    }
    currentDisplayValue.innerHTML = wholeNumbers[0];
    currentDisplayHistory.innerHTML = "";
  }
}

// function to update the wholeNumbers array after the operator function
function updateWholeNumbers() {
  wholeNumbers.shift();
  wholeNumbers.shift();
  wholeNumbers.shift();
  wholeNumbers.unshift(newNumber);
}

function start() {
  addButtons();
  currentDisplayValue.innerHTML = 0;
}

start();

// move functionality
display.onmousedown = function (event) {
  let shiftX = event.clientX - calculator.getBoundingClientRect().left;
  let shiftY = event.clientY - calculator.getBoundingClientRect().top;

  calculator.style.position = "absolute";
  calculator.style.zIndex = 1000;
  document.body.append(calculator);

  moveAt(event.pageX, event.pageY);

  // moves the display at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    calculator.style.left = pageX - shiftX + "px";
    calculator.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the display on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the display, remove unneeded handlers
  display.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    display.onmouseup = null;
  };
};

display.ondragstart = function () {
  return false;
};
