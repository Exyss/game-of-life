const rows = 30;
const cols = 80;
var gen = 0;

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
            cell.addEventListener('click', cellClick);
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

function cellClick() {

    let loc = this.id.split("-");
    let row = Number(loc[0]); //Get i
    let col = Number(loc[1]); //Get j
    
    // Select alive or dead
    if (this.className === 'alive'){
        this.setAttribute('class', 'dead');
        currGen[row][col] = 0;
    }else{
        this.setAttribute('class', 'alive');
        currGen[row][col] = 1;
    }
}

function setup(){
    createWorld();
    createGenArrays();
    initGenArrays();
}

function evolve(){
      
    createNextGen();
    updateCurrGen();
    updateWorld();
    gen++;
    document.getElementById("counter").innerHTML = gen;
}

function reset() {
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            let cell = document.getElementById(i + "-" + j);

            if(cell.className === 'alive'){
                cell.setAttribute('class', 'dead');
                currGen[i][j] = 0;
            }
        }
    }
    gen = 0;
    document.getElementById("counter").innerHTML = gen;
}