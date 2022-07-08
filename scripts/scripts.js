const DEFAULT_GRID_SIZE = 32;

const grid = document.querySelector('.grid')
const penColorPicker = document.querySelector('#pen-color');
const gridColorPicker = document.querySelector('#grid-background-color');
const rainbowButton = document.querySelector('#rainbow-mode-radio');
const clearButton = document.querySelector('.clear')
const gridButton = document.querySelector('#display-grid-radio');
const slider = document.querySelector('#grid-range');
const sliderOutput = document.querySelector('.grid-size .text');

createGrid(DEFAULT_GRID_SIZE);
drawing();

penColorPicker.addEventListener('input', getPenColor);
gridColorPicker.addEventListener('input', () => grid.style.backgroundColor = gridColorPicker.value);
clearButton.addEventListener('click', clear);
gridButton.addEventListener('click', gridLines);
slider.addEventListener('mouseup', gridResize);

// Set the slider thumb to the correct emplacement, display the default value, and update the value when changed
slider.value = `${DEFAULT_GRID_SIZE}`;
sliderOutput.textContent = `${DEFAULT_GRID_SIZE}x${DEFAULT_GRID_SIZE}`;
slider.addEventListener('input', () => sliderOutput.textContent = `${slider.value}x${slider.value}`);

function createGrid(units) {
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
    rainbowButton.checked = false;
    drawing(penColorPicker.value);
}

function getRainbowColor() {
    const rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    return randomColor = rainbowColors[Math.floor(Math.random() * rainbowColors.length)]
}

function clear() {
    grid.innerHTML = '';
    createGrid(slider.value);
    drawing();
    getPenColor();
    gridLines();
}

function gridLines() {
    const units = document.querySelectorAll('.unit');

    if (gridButton.checked) {
        units.forEach(unit => {
            unit.style.border = '1px solid grey';
        });
    } else {
        units.forEach(unit => {
            unit.style.border = 'none';
        });
    }
}

function gridResize(e) {
    e.preventDefault();
    grid.innerHTML = '';
    createGrid(slider.value);
    drawing(penColorPicker.value);
    gridButton.checked = true;
}