const rows = 30;
const cols = 80;

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
            cell.addEventListener('click', updateCell);
            cell.addEventListener('mousemove', updateCellsWithPen);  //
            this.addEventListener('mousedown', enablePen);          // "pen" enables faster setup
            this.addEventListener('mouseup', disablePen);           //
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