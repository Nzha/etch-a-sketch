const clear = document.querySelector('.clear')

let isHolding = false;

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

createSquares(32);

const units = document.querySelectorAll('.unit');

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

clear.addEventListener('click', () => window.location.reload());
