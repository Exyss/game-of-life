const rows = 30;
const cols = 80;
let gen = 0;
let population = 0;
let isPenEnabled = false;

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

function enablePen(){
    isPenEnabled = true;
}

function disablePen(){
    isPenEnabled = false;
}

function updateCellsWithPen() {

    if(isPenEnabled){
        let loc = this.id.split("-");
        let row = Number(loc[0]); //Get i
        let col = Number(loc[1]); //Get j
        
        // Select alive for all
        if (this.className != 'alive'){
            this.setAttribute('class', 'alive');
            currGen[row][col] = 1;
            updatePopulation(+1);
        }
    }
}

function updateCell() {

    let loc = this.id.split("-");
    let row = Number(loc[0]); //Get i
    let col = Number(loc[1]); //Get j
    
    // Switch between alive or dead
    if (this.className != 'alive'){
        this.setAttribute('class', 'alive');
        currGen[row][col] = 1;
        updatePopulation(+1);
    }
    else{
        this.setAttribute('class', 'dead');
        currGen[row][col] = 0;
        updatePopulation(-1);
    }
}

function updatePopulation(increment){
    population += increment;
    document.getElementById("population").innerHTML = population;
}

function updateStatus(new_status){
    document.getElementById("status").innerHTML = new_status;
}

function updateGeneration(increment){
    gen += increment;
    document.getElementById("generation").innerHTML = gen;
}

function setup(){
    createWorld();
    createGenArrays();
    initGenArrays();
}

function evolve(){
    
    oldPopulation = population;
    createNextGen();
    updateCurrGen();
    updateGeneration(+1);
    updateWorld();

    if(population == 0){
        updateStatus("Extinct");
        document.getElementById("evolve").disabled = true;
    }
    else if(population > oldPopulation){
        updateStatus("Growing");
    }
    else if(population < oldPopulation){
        updateStatus("Decaying");
    }
    else{
        updateStatus("Stasis");
    }
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
    updateGeneration(-gen);
    updatePopulation(-population);
    updateStatus("None");
    document.getElementById("evolve").disabled = false;
}