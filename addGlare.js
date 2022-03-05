// add glare element and insert it on top of the calculator child elements
const glareEl = document.createElement("div");
glareEl.classList.add("glare");
calculator.insertBefore(glareEl, calculator.firstChild);
