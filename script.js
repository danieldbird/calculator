// container for the clculator

// number display area
// running keydowns
// result of calculation, showing last number pressed, until you press equals "="
// when equals is pressed, the calculation goes up, and result is displayed below

// number pad
// clear display button
// operators
// number pad

// check if a number or decimal was pressed, or an operator, or equals, or AC.

// a possible array of objects containing
// [{
//  class: ""
//  type: "operator"
//  value: ""
// }]

// 20 buttons produced now.

// function to clear display

// function to operate on 2 numbers + - * /

const displayLive = document.querySelector(".displayLive");
const displayHistory = document.querySelector(".displayHistory");
// const displayLive = document.querySelector(".displayLive");

let currentDisplayValue = 0;
let currentDisplayHistory = 0;

let keys = [];

function keyPad(id, className, value, type) {
  this.id = id;
  this.class = className;
  this.value = value;
  this.type = type;
}

let keyBoards = document.getElementsByClassName("key");

for (let i = 0; i < keyBoards.length; i++) {
  let test = new keyPad(keyBoards[i].id, "key", keyBoards[i].innerHTML, "number");
  keys.push(test);
}

const operators = [0, 14];

for (let i = 0; i < operators.length; i++) {
  keys[operators[i]].type = "operator";
}

console.log(keys);

displayLive.innerHTML = currentDisplayValue;
displayHistory.innerHTML = currentDisplayHistory;

console.log(displayLive);

for (let i = 0; i < keys.length; i++) {
  if (keys[i].type === "number") {
    document.getElementById(keys[i].id).addEventListener("click", clickNumber);
  }
}

function clickNumber() {
  console.log("number clicked!");
}

// const keysId = ['ac', 'divide', 'multiplier', 'seven', 'eight', 'nine', 'minus', 'four', 'five', 'six',]
// const keysValue = ['AC', '/', 'x', 7, 8, 9, '-', 4, 5, 6, '+', 1, 2, 3, '=', 0, '.']

// let keys = [
//   {
//     value: "AC",
//   },
//   {
//     value: "/",
//   },
//   {
//     value: "X",
//   },
//   {
//     value: "7",
//   },
//   {
//     value: "8",
//   },
//   {
//     value: "9",
//   },
//   {
//     value: "-",
//   },
//   {
//     value: "4",
//   },
//   {
//     value: "5",
//   },
//   {
//     value: "6",
//   },
//   {
//     value: "+",
//   },
//   {
//     value: "1",
//   },
//   {
//     value: "2",
//   },
//   {
//     value: "3",
//   },
//   {
//     value: "=",
//   },
//   {
//     value: "0",
//   },
//   {
//     value: ".",
//   },
// ];
