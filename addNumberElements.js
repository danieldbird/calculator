const calculator = document.querySelector(".calculator");
const display = document.querySelector(".display");
const numpad = document.querySelector(".numpad");
const currentDisplay = document.querySelector(".currentDisplay");
const historyDisplay = document.querySelector(".historyDisplay");

// define keys, and location of operators and number.
const keys = ["AC", "/", "x", 7, 8, 9, "-", 4, 5, 6, "+", 1, 2, 3, "=", 0, "."];
const operators = [1, 2, 6, 10];
const numbers = [3, 4, 5, 7, 8, 9, 11, 12, 13, 15, 16];

// set default variable values
let currentDigit = "0";
let currentNumber = "";
let currentHistory = "";
let currentOperator = "";
let sumArray = [];

// add buttons
function addButtons() {
  // for every item in the keys array, create an element and append classes and click event listeners
  for (let i = 0; i < keys.length; i++) {
    const el = document.createElement("div");

    // add the key value
    el.innerHTML = keys[i];

    // add default class
    el.classList.add("key");

    // add ac class and event listener
    if (i === 0) {
      el.classList.add("ac");
      el.addEventListener("click", pressAC);
    }

    // add operator classes
    if (operators.includes(i)) {
      el.classList.add("operator");
      el.addEventListener("click", pressOperator);
    }

    // add number classes
    if (numbers.includes(i)) {
      el.classList.add("number");
      el.addEventListener("click", pressNumber);
    }

    // add zero class and event listener
    if (i === 15) {
      el.classList.add("zero");
      el.addEventListener("click", pressNumber);
    }

    // add equal class and event listener
    if (i === 14) {
      el.classList.add("equal");
      el.addEventListener("click", pressEquals);
    }

    // append each button to the numpad
    numpad.appendChild(el);
  }
}

// press AC function
function pressAC() {
  currentDigit = "0";
  currentNumber = "";
  currentHistory = "";
  currentOperator = "";
  sumArray = [];

  updateDisplay();
}

// press number function
function pressNumber(e) {
  // dont allow zero at the start of a number
  if (e.target.innerHTML === "0" && !currentNumber) {
    return;
  }

  // only allow one decimal place in a number
  if (e.target.innerHTML === "." && currentNumber.includes(".")) {
    return;
  }

  // add a zero in front of a decimal place if there is no current number
  if (e.target.innerHTML === "." && !currentNumber) {
    currentDigit = e.target.innerHTML;
    currentNumber = "0" + e.target.innerHTML;
    currentHistory = currentHistory + "0" + e.target.innerHTML;
    updateDisplay();
    return;
  }

  // otherwise add the number as usual
  currentDigit = e.target.innerHTML;
  currentNumber = currentNumber + e.target.innerHTML;
  currentHistory = currentHistory + e.target.innerHTML;
  updateDisplay();
  // }
}

// press operator function
function pressOperator(e) {
  // if there is not current number or items in the sum array, just display the key pressed and do nothing else.
  if (!currentNumber && !sumArray.length) {
    currentDigit = e.target.innerHTML;
    updateDisplay();
    return;
  }
  // if there is a current number, add the operator to the array
  if (currentNumber) {
    currentOperator = e.target.innerHTML;
    currentDigit = e.target.innerHTML;
    sumArray.push(currentNumber, currentOperator);
    currentHistory = sumArray.join("");
    currentNumber = "";
    currentOperator = "";
    updateDisplay();
    return;
  }
  // if there is no current number, change the last operator to the one that was pressed
  if (!currentNumber) {
    currentDigit = e.target.innerHTML;
    sumArray.pop();
    sumArray.push(currentDigit);
    currentHistory = sumArray.join("");
    updateDisplay();
    return;
  }
}

// press equals
function pressEquals(e) {
  // there is no current number when equals is pressed, do nothing.
  if (!currentNumber) {
    return;
  }
  // before we do the calculation, push the existing current number to the sum array
  sumArray.push(currentNumber);
  // do the calculation, changing 'x' to '*'
  const evaluation = math.evaluate(`${sumArray.join("").replaceAll("x", "*")}`);
  // display an exponential when a number is too large
  // TODO: bug test, and verify this is working.
  const result = math.format(evaluation, {
    notation: "auto",
    precision: 7,
    lowerExp: -9,
    upperExp: 9,
  });
  // update the values to the result and update the display
  currentHistory = result;
  currentDigit = result;
  currentNumber = result;
  currentOperator = "";
  sumArray = [];
  updateDisplay();
}

// update the display with new values
function updateDisplay() {
  historyDisplay.innerHTML = currentHistory;
  currentDisplay.innerHTML = currentDigit;

  console.clear();

  console.log("Current Digit: " + currentDigit);
  console.log("Current Number: " + currentNumber);
  console.log("Current History: " + currentHistory);
  console.log("Current Operator: " + currentOperator);
  console.log(sumArray);
}

function start() {
  addButtons();
}

start();

// todo
// either handle negative numbers straight away, or add a +/- button
