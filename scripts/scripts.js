const DEFAULT_GRID_SIZE = 32;

const grid = document.querySelector('.grid')
const penColorPicker = document.querySelector('#pen-color');
const gridColorPicker = document.querySelector('#grid-background-color');
const rainbowButton = document.querySelector('#rainbow-mode-radio');
const clearButton = document.querySelector('.clear')
const eraserButton = document.querySelector('#eraser-radio');
const gridButton = document.querySelector('#display-grid-radio');
const slider = document.querySelector('#grid-range');
const sliderOutput = document.querySelector('.grid-size .text');

createGrid(DEFAULT_GRID_SIZE);
drawing();

penColorPicker.addEventListener('input', getPenColor);
gridColorPicker.addEventListener('input', () => grid.style.backgroundColor = gridColorPicker.value);
rainbowButton.addEventListener('click', () => eraserButton.checked = false);
clearButton.addEventListener('click', clear);
eraserButton.addEventListener('click', erase);
gridButton.addEventListener('click', gridLines);
slider.addEventListener('mouseup', gridResize);

let mouseDown = false
document.body.addEventListener('mousedown', () => mouseDown = true);
document.body.addEventListener('mouseup', () => mouseDown = false);

// Set the slider thumb to the correct emplacement, display the default value, and update the value when changed
slider.value = `${DEFAULT_GRID_SIZE}`;
sliderOutput.textContent = `${DEFAULT_GRID_SIZE}x${DEFAULT_GRID_SIZE}`;
slider.addEventListener('input', () => sliderOutput.textContent = `${slider.value}x${slider.value}`);

function createGrid(size) {
    const grid = document.querySelector('.grid');
    let divWidth = grid.offsetWidth / size;

    for (let i = 0; i < (size*size); i++) {
        const div = document.createElement('div');
        div.className = 'unit';
        div.style.width = `${divWidth}px`;
        grid.appendChild(div);
    }
}

function drawing(penColor='black') {
    const units = document.querySelectorAll('.unit');

    units.forEach(unit => unit.addEventListener('mouseover', changeColor));
    units.forEach(unit => unit.addEventListener('mousedown', changeColor));

    function changeColor(e) {
        if (e.type === 'mouseover' && !mouseDown) return
        e.preventDefault();
        if (rainbowButton.checked) {
            e.target.style.backgroundColor = getRainbowColor()
        } else {
            e.target.style.backgroundColor = penColor;
        }
    }
}

function getPenColor() {
    rainbowButton.checked = false;
    eraserButton.checked = false;
    drawing(penColorPicker.value);
}

function getRainbowColor() {
    const rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    return randomColor = rainbowColors[Math.floor(Math.random() * rainbowColors.length)]
}

function clear() {
    grid.innerHTML = '';
    eraserButton.checked = false
    createGrid(slider.value);
    drawing(penColorPicker.value);
    gridLines();
}

function erase() {
    rainbowButton.checked = false;

    if (eraserButton.checked) {
        drawing(grid.style.backgroundColor);
    }
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
    eraserButton.checked = false
    gridButton.checked = true;
    createGrid(slider.value);
    drawing(penColorPicker.value);
}