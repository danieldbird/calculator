// number display area
// result of calculation, showing last number pressed, until you press equals "="
// when equals is pressed, the calculation goes up, and result is displayed below

const display = document.querySelector(".display");
const numpad = document.querySelector(".numpad");

const keys = ["AC", "/", "x", 7, 8, 9, "-", 4, 5, 6, "+", 1, 2, 3, "=", 0, "."];
const operators = [1, 2, 6, 10];
const functions = [0, 14];

// let currentDisplayValue = 0;
// let currentDisplayHistory = 0;

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
    } else {
      el.addEventListener("click", pressNumber);
    }

    numpad.appendChild(el);
  }
}

// function to clear display
function pressAC() {
  console.log("Pressed AC");
}

function pressNumber(i) {
  console.log(i.target.innerHTML);
}

// function to operate on 2 numbers + - * /
function pressEquals(i) {
  console.log(i.target.innerHTML);
}

function start() {
  addButtons();
}

start();
