var rangeCount = document.getElementById("present");
var ranges = document.querySelectorAll(".range");
var rangeBack = document.querySelectorAll(".range-back");
var rangeTouch = document.querySelectorAll(".touch-range");
var mouse = {
    x: 0,
    y: 0,
    key: 0,
    value: 0,
    range: false,
};
function rangeMove(index, name, pass, action) {
    if (action === void 0) { action = "get"; }
    if (name === undefined)
        return false;
    if (action === "set") {
        if (pass === undefined)
            return false;
        ranges[index].setAttribute("data-".concat(name), pass);
    }
    else {
        return ranges[index].getAttribute("data-".concat(name));
    }
}
var addDel = function (index, action) {
    if (index === void 0) { index = 0; }
    if (action === void 0) { action = "Null"; }
    if (action === "add") {
        rangeTouch[i].classList.add("ta01x");
    }
    else {
        rangeTouch[i].classList.remove("ta01x");
    }
};
function handleRangeEvent(i) {
    return function (event) {
        console.log(event);
        mouse.key = i;
        if (event.type === "mousedown" || event.type === "touchstart") {
            rangeMove(i, "move", "true", "set");
        }
        else if (event.type === "mousemove" || event.type === "touchmove") {
            if (rangeMove(i, "move") === "true") {
                slide();
            }
            rangeMove(i, "range", mouse.value, "set");
        }
        else if (event.type === "touchcancel" || event.type === "mouseup") {
            rangeMove(i, "move", "false", "set");
        }
    };
}
ranges.forEach(function (range, i) {
    range.addEventListener("mousedown", handleRangeEvent(i));
    range.addEventListener("mousemove", handleRangeEvent(i));
    range.addEventListener("touchmove", handleRangeEvent(i));
    range.addEventListener("touchstart", handleRangeEvent(i));
    range.addEventListener("mouseup", handleRangeEvent(i));
    range.addEventListener("touchcancel", handleRangeEvent(i));
    range.addEventListener("click", function () {
        mouse.key = i;
        var left = range.getBoundingClientRect().left;
        var rangeM = range.getBoundingClientRect();
        var clientLeft = mouse.x - left;
        if (clientLeft > 0 && clientLeft <= 199) {
            rangeTouch[i].style.left = "".concat(clientLeft - 5, "px");
        }
        rangeBack[i].style.maxWidth = "".concat(rangeM.width, "px");
        rangeBack[i].style.height = "".concat(rangeM.height, "px");
        rangeBack[i].style.width = "".concat(mouse.x - left, "px");
    });
});
function slide() {
    if (rangeMove(mouse.key, "move") === "true") {
        var range = ranges[mouse.key];
        var rangeM = range.getBoundingClientRect();
        var rangeTouchSlide = (100 * (mouse.x - rangeM.left)) / rangeM.width;
        var clientLeft = mouse.x - rangeM.left;
        if (clientLeft > 0 && clientLeft <= 199) {
            rangeTouch[mouse.key].style.left = "".concat(clientLeft - 5, "px");
        }
        if (rangeTouchSlide <= 100 && rangeTouchSlide > 0) {
            rangeCount.innerHTML = "".concat(Math.floor(rangeTouchSlide), "%");
            mouse.value = Math.floor(rangeTouchSlide);
        }
        rangeBack[mouse.key].style.maxWidth = "".concat(rangeM.width, "px");
        rangeBack[mouse.key].style.height = "".concat(rangeM.height, "px");
        rangeBack[mouse.key].style.width = "".concat(mouse.x - rangeM.left, "px");
    }
}
function handleMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (rangeMove(mouse.key, "move")) {
        slide();
    }
}
window.addEventListener("mousemove", handleMove);
window.addEventListener("touchmove", handleMove);
window.addEventListener("touchend", handleMove);
window.addEventListener("mouseup", handleMove);
window.addEventListener("mouseup", function () {
    console.log("Winodw fired x32");
    handleRangeEvent;
    rangeMove(mouse.key, "move", "false", "set");
});
window.addEventListener("touchcancel", function () {
    console.log("Winodw fired x34");
    handleRangeEvent;
    rangeMove(mouse.key, "move", "false", "set");
});
window.addEventListener("mousemove", handleMove, { passive: false });
window.addEventListener("touchmove", handleMove, { passive: false });