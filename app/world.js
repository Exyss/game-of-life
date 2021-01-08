const rows = 35;
const cols = 100;

function createWorld() {

    let world = document.querySelector('#world');
    let table = document.createElement('table');
    table.setAttribute('id','worldgrid');
    
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < cols; j++) {

            let cell = document.createElement('td');
            cell.setAttribute('id', i + '-' + j);
            cell.setAttribute('class', 'dead');

            cell.addEventListener('contextmenu', function(e){e.preventDefault();}); //disable context menu on cells
            cell.addEventListener('click', updateCell);     // swap status on single click
            cell.addEventListener('mousemove', updateCellsWithPen);         //
            this.addEventListener('mousedown', function(e){pressed(e);});   // "drawing" tool for faster setup
            this.addEventListener('mouseup', released);                     //

            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    world.appendChild(table);
}

function updateWorld() {
    
    let cell='';

    for (row in currGen) {
        for (col in currGen[row]) {
            cell = document.getElementById(row + '-' + col);

            if (currGen[row][col] == 0) {
                cell.setAttribute('class', 'dead');
            }
            else {
                cell.setAttribute('class', 'alive');
            }
        }
    }
}