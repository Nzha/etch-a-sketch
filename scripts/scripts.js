const rainbowButton = document.querySelector('#rainbow-mode-radio');
const gridButton = document.querySelector('#display-grid-radio');
const slider = document.querySelector('#grid-range');
const sliderOutput = document.querySelector('.grid-size .text');

createSquares(slider.value);
drawing();
getPenColor();
gridBackgroundColor()
gridDisplay()
sliders();
gridResize();
clear();

function createSquares(units) {
    const grid = document.querySelector('.grid');
    let divWidth = grid.offsetWidth / units;

    for (let i = 0; i < (units*units); i++) {
        const div = document.createElement('div');
        div.className = 'unit';
        div.style.width = `${divWidth}px`;
        grid.appendChild(div);
    }
}

function drawing(penColor='black') {
    const units = document.querySelectorAll('.unit');
    let isHolding = false;

    // Allows drawing with a click
    units.forEach(unit => unit.addEventListener('click', (e) => {
        if (rainbowButton.checked) {
            e.target.style.backgroundColor = getRainbowColor()
        } else {
            e.target.style.backgroundColor = penColor;
        }
    }));

    //  Allows drawing while holding mouse down
    units.forEach(unit => unit.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isHolding = true;
    }));
    units.forEach(unit => unit.addEventListener('mousemove', (e) => {
        if (isHolding === true && rainbowButton.checked) {
            e.target.style.backgroundColor = getRainbowColor();
        } else if (isHolding === true) {
            e.target.style.backgroundColor = penColor;
        }
    }));
    units.forEach(unit => unit.addEventListener('mouseup', (e) => {
        isHolding = false;
    }));
}

function getPenColor() {
    const penColorPicker = document.querySelector('#pen-color');

    penColorPicker.addEventListener('input', () => {
        rainbowButton.checked = false;
        drawing(penColorPicker.value);
    })
}

function gridBackgroundColor() {
    const grid = document.querySelector('.grid')
    const gridColorPicker = document.querySelector('#grid-background-color');

    gridColorPicker.addEventListener('input', () => {
        grid.style.backgroundColor = gridColorPicker.value;
    })
}

function getRainbowColor() {
    const rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    return randomColor = rainbowColors[Math.floor(Math.random() * rainbowColors.length)]
}

function clear() {
    const clear = document.querySelector('.clear')
    clear.addEventListener('click', () => window.location.reload());
}

function gridDisplay() {
    const units = document.querySelectorAll('.unit');

    gridButton.addEventListener('click', () => {
        if (gridButton.checked) {
            units.forEach(unit => {
                unit.style.border = '1px solid grey';
            });
        } else {
            units.forEach(unit => {
                unit.style.border = 'none';
            });
        }
    });
}

function sliders() {

    // Display the default slider value
    sliderOutput.textContent = `${slider.value}x${slider.value}`;

    // Update the slider value each time it is changed
    slider.oninput = function() {
        sliderOutput.textContent = `${this.value}x${this.value}`;
    }
}

function gridResize() {
    slider.addEventListener('mouseup', (e) => {
        e.preventDefault();
        const units = document.querySelectorAll('.unit');
        units.forEach(unit => unit.remove());
        createSquares(slider.value);
        drawing();
        gridDisplay();
        gridButton.checked = true;
    });
}