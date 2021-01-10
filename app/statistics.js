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

function setStatusTo(new_status){
    switch(new_status){
        case "GROWING":
            document.getElementById("status").innerHTML = "Growing";
            document.getElementById("status").style.color = "var(--success)";
            break;
        case "STASIS":
            document.getElementById("status").innerHTML = "Stasis";
            document.getElementById("status").style.color = "var(--dark-cyan)";
            break;
        case "DECAYING":
            document.getElementById("status").innerHTML = "Decaying";
            document.getElementById("status").style.color = "var(--warning)";
            break;
        case "EXTINCT":
            document.getElementById("status").innerHTML = "Extinct";
            document.getElementById("status").style.color = "var(--danger)";
            break;
        default:
            document.getElementById("status").innerHTML = "Unknown";
            document.getElementById("status").style.color = "";
            break;
    }
}