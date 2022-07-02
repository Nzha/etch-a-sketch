function createSquares(number) {
    const grid = document.querySelector('.grid');
    let divWidth = grid.offsetWidth / number;
    console.log(divWidth);
    let divHeight = grid.offsetHeight / number;

    for (let i = 0; i < number; i++) {
        const div = document.createElement('div');
        div.className = 'unit';
        // div.style.width = `${divWidth}px`;
        // div.style.height = `${divHeight}px`;
        grid.appendChild(div);
    }
}

createSquares(100);