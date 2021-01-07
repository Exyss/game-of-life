let gen = 0;
let population = 0;
let isPenEnabled = false;
let evolutionSpeed = 1;

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

function updateEvolutionSpeed(){
    evolutionSpeed = Number(document.getElementById("speed").value)/100;
    document.getElementById("speed-value").innerHTML = evolutionSpeed.toFixed(2);
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

function enablePen(){
    isPenEnabled = true;
}

function disablePen(){
    isPenEnabled = false;
}

function setup(){
    createWorld();
    createGenArrays();
    initGenArrays();
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

function autoevolve(){

    if(population > 0){
        evolve();
    }
    else{
        stopAutoevolving();
    }
}

function startAutoevolving(){

    evolutionInterval = setInterval(autoevolve, 1000/evolutionSpeed);
    document.getElementById("auto-evolve").setAttribute("value", "Stop autoevolving");
    document.getElementById("auto-evolve").setAttribute("onclick", "stopAutoevolving()");
}

function stopAutoevolving(){

    clearInterval(evolutionInterval);
    document.getElementById("auto-evolve").setAttribute("value", "Start autoevolving");
    document.getElementById("auto-evolve").setAttribute("onclick", "startAutoevolving()");
}