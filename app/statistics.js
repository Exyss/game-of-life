let timesEvolved = 0;
let population = 0;

function updateGeneration(increment){
    timesEvolved += increment;
    document.getElementById("generation").innerHTML = timesEvolved;
}

function updatePopulation(increment){
    population += increment;
    document.getElementById("population").innerHTML = population;
}

function updateStatus(new_status){
    document.getElementById("status").innerHTML = new_status;
}