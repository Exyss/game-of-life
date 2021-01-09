let isPenEnabled = false;
let isUsingRightclick = false;
let isAutoEvOn = false;
let evolutionSpeed = 1;

window.onload=()=>{     //setup game
    createWorld();
    createGenArrays();
    initGenArrays();
    document.getElementById("sld-speed").addEventListener("input", function(){
        updateEvSpeed();
        if(isAutoEvOn){
            stopAutoEv();
            startAutoEv();
        }
    });
    document.getElementById("list-pattern").addEventListener("mouseover", function(){
        document.getElementById("btn-pattern").style.borderTopLeftRadius = "0px";
        document.getElementById("btn-pattern").style.borderTopRightRadius = "0px";
    });
    document.getElementById("list-pattern").addEventListener("mouseout", function(){
        document.getElementById("btn-pattern").style.borderTopLeftRadius = "";
        document.getElementById("btn-pattern").style.borderTopRightRadius = "";
    });
    updateEvSpeed();
}

function updateEvSpeed(){
    evolutionSpeed = Number(document.getElementById("sld-speed").value)/100;
    document.getElementById("speed").innerHTML = evolutionSpeed.toFixed(2);
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

function updateCellsWithPen(pressedButton) {

    if(isPenEnabled){
        let loc = this.id.split("-");
        let row = Number(loc[0]); //Get i
        let col = Number(loc[1]); //Get j
        
        if(isUsingRightclick){  //kill every cell passed through
            if (this.className != 'dead'){
                this.setAttribute('class', 'dead');
                currGen[row][col] = 0;
                updatePopulation(-1);
            }
        }
        else{   //revive every cell passed through
            if (this.className != 'alive'){
                this.setAttribute('class', 'alive');
                currGen[row][col] = 1;
                updatePopulation(+1);
            }
        }
        
    }
}

function pressed(e){
    isPenEnabled = true;
    if (e.which) isUsingRightclick = (e.which == 3);
    else if (e.button) isUsingRightclick = (e.button == 2);

    if(isUsingRightclick) document.body.style.cursor = "pointer";
    else document.body.style.cursor = "crosshair";
}

function released(){
    isPenEnabled = false;
    isUsingRightclick = false;
    document.body.style.cursor = "default";
}

function reset() {
    
    if(isAutoEvOn){
        stopAutoEv();
    }

    updateGeneration(-timesEvolved);
    updatePopulation(-population);
    updateStatus("None");
    document.getElementById("btn-evolve").disabled = false;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            let cell = document.getElementById(i + "-" + j);
            currGen[i][j] = pattern[i][j];

            if(currGen[i][j] == 1){
                cell.setAttribute('class', 'alive');
                updatePopulation(+1);
            }
            else{
                cell.setAttribute('class', 'dead');
            }
        }
    }
}

function kill() {
    
    if(isAutoEvOn){
        stopAutoEv();
    }

    updateGeneration(-timesEvolved);
    updatePopulation(-population);
    updateStatus("None");
    document.getElementById("btn-evolve").disabled = false;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            let cell = document.getElementById(i + "-" + j);

            if(cell.className === 'alive'){
                cell.setAttribute('class', 'dead');
                currGen[i][j] = 0;
            }
        }
    }
}

function evolve(){
    
    oldPopulation = population;
    createNextGen();
    updateCurrGen();
    updateGeneration(+1);
    updateWorld();

    if(population == 0){
        updateStatus("Extinct");
        document.getElementById("btn-evolve").disabled = true;
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
        stopAutoEv();
    }
}

function startAutoEv(){

    isAutoEvOn = true;
    evolutionInterval = setInterval(autoevolve, 250/evolutionSpeed);
    document.getElementById("btn-auto").setAttribute("value", "Stop auto-evolving");
    document.getElementById("btn-auto").setAttribute("onclick", "stopAutoEv()");
    document.getElementById("btn-evolve").disabled = true;
}

function stopAutoEv(){

    isAutoEvOn = false;
    clearInterval(evolutionInterval);
    document.getElementById("btn-auto").setAttribute("value", "Start auto-evolving");
    document.getElementById("btn-auto").setAttribute("onclick", "startAutoEv()");
    document.getElementById("btn-evolve").disabled = false;
}