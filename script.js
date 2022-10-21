let rangeCount = document.getElementById("range");
let ranges = document.querySelectorAll(".range");
let rangeBack = document.querySelectorAll(".range-back");
let rangeTouch = document.querySelectorAll(".touch-range");

let mouse = {
    x: 0,
    y: 0,
    range: false,
}


function range(el, i) {

    el.addEventListener("mousedown", function () {
        mouse.range = true;
    })

    rangeBack[i].addEventListener("mousedown", function () {
        mouse.range = true;
    })

    ranges[i].addEventListener("click", function (e) {
        let lft = ranges[i].getBoundingClientRect().left;
        let rangeM = ranges[i].getBoundingClientRect();
        let clintLeft = mouse.x - lft;

        // expreance
        if (clintLeft > 0 && clintLeft <= 199) {
            rangeTouch[i].style.left = clintLeft + "px";
        }

        rangeBack[i].style.maxWidth = rangeM.width + "px";
        rangeBack[i].style.height = range.height + "px";
        rangeBack[i].style.width = (mouse.x - lft) + "px";
    })


    if (mouse.range) {

        let lft = ranges[i].getBoundingClientRect().left;
        let rangeM = ranges[i].getBoundingClientRect();
        let rangeTouchSlide = (100 * (mouse.x - lft)) / rangeM.width;
        let clintLeft = mouse.x - lft;

        // expreance
        if (clintLeft > 0 && clintLeft <= 199) {
            rangeTouch[i].style.left = clintLeft + "px";
        }

        if (rangeTouchSlide <= 100 && rangeTouchSlide > 0) {
            rangeCount.innerHTML = Math.floor(rangeTouchSlide) + "%";
        }
        rangeBack[i].style.maxWidth = rangeM.width + "px";
        rangeBack[i].style.height = range.height + "px";
        rangeBack[i].style.width = (mouse.x - lft) + "px";
    }

}


window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    rangeTouch.forEach((el, i) => {
        range(el, i)
    })
})

window.addEventListener("mouseup", function () {
    mouse.range = false;
})