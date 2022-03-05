// clientX === pixels away from the edge of browser window not including scroll distance
// pageX === pixels away from edge of browser window including scroll distance
// screenX === pixels away from edge of computer screen
// offsetX === pixels away from edge of element box

// listen for mousedown on the display
display.addEventListener("mousedown", (e) => {
  // get exact click position on element
  // ie: the click position away from edge of browser window,
  // minus where the element starts from the edge of the browser window
  let shiftX = e.clientX - calculator.getBoundingClientRect().left;
  let shiftY = e.clientY - calculator.getBoundingClientRect().top;

  // make the element absolutely positioned
  calculator.style.position = "absolute";

  // move the display by changing top and left of absolute element
  // take pageX and pageY and minus the initial shift amounts
  function updatePosition(pageX, pageY) {
    calculator.style.left = pageX - shiftX + "px";
    calculator.style.top = pageY - shiftY + "px";
  }

  // when the mouse moves, update the position
  function mouseMove(e) {
    updatePosition(e.pageX, e.pageY);
  }

  // nested event listener to move the display when both mousedown and mousemove are active
  document.addEventListener("mousemove", mouseMove);

  // when we drop the element, remove mousemove event listener
  display.onmouseup = function () {
    document.removeEventListener("mousemove", mouseMove);
  };
});
