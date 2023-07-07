let rangeCount = document.getElementById("range");
let ranges = document.querySelectorAll(".range");
let rangeBack = document.querySelectorAll(".range-back");
let rangeTouch = document.querySelectorAll(".touch-range");

let mouse = {
    x: 0,
    y: 0,
    key: 0,
    range: false,
}


rangeTouch.forEach((e, i) => {

    ranges[i].addEventListener("mousedown", function () {
        mouse.range = true;
        mouse.key = i;
    })

    ranges[i].addEventListener("touchstart", function () {
        mouse.key = i;
        mouse.range = true;
    })

    ranges[i].addEventListener("mousemove", function () {
        mouse.range = true;
        mouse.key = i;
        if (mouse.range) {
            slide()
        }
    })

    ranges[i].addEventListener("touchmove", function () {
        mouse.key = i;
        mouse.range = true;
        if (mouse.range) {
            slide()
        }
    })

    rangeBack[i].addEventListener("mousedown", function () {
        mouse.range = true;
        mouse.key = i;
    })

    ranges[i].addEventListener("click", function () {

        mouse.key = i;
        let left = ranges[i].getBoundingClientRect().left;
        let rangeM = ranges[i].getBoundingClientRect();
        let clintLeft = mouse.x - left;


        // checking logic
        if (clintLeft > 0 && clintLeft <= 199) {
            rangeTouch[i].style.left = (clintLeft - 5) + "px";
        }

        rangeBack[i].style.maxWidth = rangeM.width + "px";
        rangeBack[i].style.height = range.height + "px";
        rangeBack[i].style.width = (mouse.x - left) + "px";
    })


})

// Slide function

function slide() {
    if (mouse.range) {
        let left = ranges[mouse.key].getBoundingClientRect().left;
        let rangeM = ranges[mouse.key].getBoundingClientRect();
        let rangeTouchSlide = (100 * (mouse.x - left)) / rangeM.width;
        let clintLeft = mouse.x - left;

        // Checking logic
        if (clintLeft > 0 && clintLeft <= 199) {
            rangeTouch[mouse.key].style.left = (clintLeft - 5) + "px";
        }

        if (rangeTouchSlide <= 100 && rangeTouchSlide > 0) {
            rangeCount.innerHTML = Math.floor(rangeTouchSlide) + "%";
        }

        rangeBack[mouse.key].style.maxWidth = rangeM.width + "px";
        rangeBack[mouse.key].style.height = range.height + "px";
        rangeBack[mouse.key].style.width = (mouse.x - left) + "px";
    }
}

window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;


    if (mouse.range) {
        slide(mouse.key);
        e.preventDefault()
    }

})

window.addEventListener("touchmove", function (e) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;

    if (mouse.range) {
        slide(mouse.key);
        e.preventDefault()
    }

})

window.addEventListener("mouseup", function () {
    mouse.range = false;
})

window.addEventListener("touchend", function () {
    mouse.range = false;
})

window.addEventListener("touchcancel", function () {
    mouse.range = false;
})

let rng = document.querySelectorAll("#rng");

rng[0].innerHTML += `<span>Hello World<span>`;

let el = document.querySelectorAll("input-text");

for (let i = 0; i < el.length; i++) {
    el[i].outerHTML = "<input type='text'>";
}

let io = "Null"
let els = document.querySelectorAll("input-pass");


