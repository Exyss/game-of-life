function applyRandomPattern(){

    kill();
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            if(Math.floor(Math.random()*100)+1 <= 20){   //20% chance of reviving a cell
                cell = document.getElementById(i + "-" + j);
                cell.setAttribute('class', 'alive');
                currGen[i][j] = 1;
                updatePopulation(+1);
            }
        }
    }
}

function applyNestedFramePattern(){

    kill();
    plotFrame(0);
    plotFrame(6);
}

function plotFrame(spacing){

    if(spacing >= 0 && spacing < rows && spacing < cols){
        let cell;

        for(let col=spacing; col<cols-spacing; col++){    //fill frame top row
            cell = document.getElementById(spacing + "-" + col);
            cell.setAttribute('class', 'alive');
            currGen[spacing][col] = 1;
            updatePopulation(+1);
        }
        for(let col=spacing; col<cols-spacing; col++){    //fill frame bottom row
            cell = document.getElementById(String(rows-spacing-1) + "-" + col);
            cell.setAttribute('class', 'alive');
            currGen[rows-spacing-1][col] = 1;
            updatePopulation(+1);
        }

        for(let row=spacing; row<rows-spacing; row++){    //fill frame left column
            cell = document.getElementById(row + "-" + spacing);
            cell.setAttribute('class', 'alive');
            currGen[row][spacing] = 1;
            updatePopulation(+1);
        }
        for(let row=spacing; row<rows-spacing; row++){    //fill frame right column
            cell = document.getElementById(row + "-" + String(cols-spacing-1));
            cell.setAttribute('class', 'alive');
            currGen[row][cols-spacing-1] = 1;
            updatePopulation(+1);
        }
    }
}