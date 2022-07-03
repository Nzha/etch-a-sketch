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

createSquares(16);

const units = document.querySelectorAll('.unit');

units.forEach(unit => unit.addEventListener('mouseover', sketch));

function sketch(e) {
    e.target.style.backgroundColor = 'black';
}