const rangeCount = document.getElementById("present");
const ranges = document.querySelectorAll(".range");
const rangeBack = document.querySelectorAll(".range-back");
const rangeTouch = document.querySelectorAll(".touch-range");

const mouse = {
  x: 0,
  y: 0,
  key: 0,
  value: 0,
  range: false,
};

function rangeMove(index, name, pass, action = "get") {
  if (name === undefined) return false;

  if (action === "set") {
    if (pass === undefined) return false;
    ranges[index].setAttribute(`data-${name}`, pass);
  } else {
    return ranges[index].getAttribute(`data-${name}`);
  }
}

function handleRangeEvent(i) {
  return function (event) {
    mouse.key = i;
    if (event.type === "mousedown" || event.type === "touchstart") {
      mouse.range = true;
    } else if (event.type === "mousemove" || event.type === "touchmove") {
      if (rangeMove(i, "move") === "true") {
        slide();
        console.log("Running..");
      }
      rangeMove(i, "range", mouse.value, "set");
    } else if (event.type === "touchcancel") {
      rangeMove(i, "move", "false", "set");
    }
  };
}

ranges.forEach((range, i) => {
  range.addEventListener("mousedown", handleRangeEvent(i));
  range.addEventListener("mouseleave", () => console.log("Mouse Out"));
  range.addEventListener("touchstart", handleRangeEvent(i));
  range.addEventListener("mousemove", handleRangeEvent(i));
  range.addEventListener("touchmove", handleRangeEvent(i));
  range.addEventListener("touchcancel", handleRangeEvent(i));

  range.addEventListener("click", function () {
    mouse.key = i;
    const left = range.getBoundingClientRect().left;
    const rangeM = range.getBoundingClientRect();
    const clientLeft = mouse.x - left;

    if (clientLeft > 0 && clientLeft <= 199) {
      rangeTouch[i].style.left = `${clientLeft - 5}px`;
    }

    rangeBack[i].style.maxWidth = `${rangeM.width}px`;
    rangeBack[i].style.height = `${rangeM.height}px`;
    rangeBack[i].style.width = `${mouse.x - left}px`;
  });
});

function slide() {
  if (rangeMove(mouse.key, "move")) {
    const range = ranges[mouse.key];
    const rangeM = range.getBoundingClientRect();
    const rangeTouchSlide = (100 * (mouse.x - rangeM.left)) / rangeM.width;
    const clientLeft = mouse.x - rangeM.left;

    if (clientLeft > 0 && clientLeft <= 199) {
      rangeTouch[mouse.key].style.left = `${clientLeft - 5}px`;
    }

    if (rangeTouchSlide <= 100 && rangeTouchSlide > 0) {
      rangeCount.innerHTML = `${Math.floor(rangeTouchSlide)}%`;
      mouse.value = Math.floor(rangeTouchSlide);
    }

    rangeBack[mouse.key].style.maxWidth = `${rangeM.width}px`;
    rangeBack[mouse.key].style.height = `${rangeM.height}px`;
    rangeBack[mouse.key].style.width = `${mouse.x - rangeM.left}px`;
  }
}

function handleMouseMove(e) {
  e.preventDefault();
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  if (mouse.range) {
    slide();
  }
}

function handleTouchMove(e) {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
  e.preventDefault();

  if (mouse.range) {
    slide();
  }
}

window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("touchmove", handleTouchMove);

window.addEventListener("mousemove", handleMouseMove, { passive: false });
window.addEventListener("touchmove", handleTouchMove, { passive: false });

window.addEventListener("mouseup", () => {
  mouse.range = false;
});

window.addEventListener("touchend", () => {
  mouse.range = false;
});

window.addEventListener("touchcancel", () => {
  mouse.range = false;
});

// ? This is like components
// let rng = document.querySelectorAll("#range");

// rng[0].innerHTML += `<span>Hello World<span>`;

// let el = document.querySelectorAll("input-text");

// for (let i = 0; i < el.length; i++) {
//     el[i].outerHTML = "<input type='text'>";
// }

// let io = "Null"
// let els = document.querySelectorAll("input-pass");
