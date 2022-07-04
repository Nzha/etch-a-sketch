const slider = document.querySelector('#grid-range');
const sliderOutput = document.querySelector('.grid-size .text');

createSquares(slider.value);
drawing();
sliders();
gridSize();
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

function sliders() {

    // Display the default slider value
    sliderOutput.textContent = `${slider.value}x${slider.value}`;

    // Update the slider value each time it is changed
    slider.oninput = function() {
        sliderOutput.textContent = `${this.value}x${this.value}`;
    }
}

function gridSize() {
    slider.addEventListener('mouseup', () => {
        const units = document.querySelectorAll('.unit');
        units.forEach(unit => unit.remove());
        createSquares(slider.value);
        drawing();
    });
}

function drawing() {
    const units = document.querySelectorAll('.unit');
    let isHolding = false;

    // Allows drawing with a click
    units.forEach(unit => unit.addEventListener('click', (e) => {
        e.target.style.backgroundColor = 'black';
    }));

    //  Allows drawing while holding mouse down
    units.forEach(unit => unit.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isHolding = true;
    }));
    units.forEach(unit => unit.addEventListener('mousemove', (e) => {
        if (isHolding === true) {
            e.target.style.backgroundColor = 'black';
        }
    }));
    units.forEach(unit => unit.addEventListener('mouseup', (e) => {
        isHolding = false;
    }));
}

function clear() {
    const clear = document.querySelector('.clear')
    clear.addEventListener('click', () => window.location.reload());
}