let currGen = [rows];   //
let nextGen = [rows];   // Creates two-dimensional arrays

function createGenArrays() {

    for (let i = 0; i < rows; i++) {
        currGen[i] = new Array(cols);
        nextGen[i] = new Array(cols);
    }
}

function initGenArrays() {

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            currGen[i][j] = 0;
            nextGen[i][j] = 0;
        }
    }
}

function getNeighborCount(row, col) {

    let count = 0;
    let nrow = Number(row);
    let ncol = Number(col);
    
    //if not on first row
    if (nrow - 1 >= 0) {
        if (currGen[nrow - 1][ncol] == 1)       //check top neighbor
            count++;
    }

    //if not on last row
    if (nrow + 1 < rows) {
        if (currGen[nrow + 1][ncol] == 1)       //check bottom neighbor
            count++;
    }

    //if not on first column
    if (ncol - 1 >= 0) {
        if (currGen[nrow][ncol - 1] == 1)       //check left neighbor
            count++;
    }

    //if not on last column
    if (ncol + 1 < cols) {
        if (currGen[nrow][ncol + 1] == 1)       //check right neighbor
            count++;
    }

    //if not on upper left corner
    if (nrow - 1 >= 0 && ncol - 1 >= 0) {
        if (currGen[nrow - 1][ncol - 1] == 1)   //check upper left neighbor
            count++;
    }

    //if not on upper right corner
    if (nrow - 1 >= 0 && ncol + 1 < cols) {
        if (currGen[nrow - 1][ncol + 1] == 1)   //check upper right neighbor
            count++;
    }
    
    //if not on bottom left corner
    if (nrow + 1 < rows && ncol - 1 >= 0) {
        if (currGen[nrow + 1][ncol - 1] == 1)   //check bottom left neighbor
            count++;
    }
    
    //if not on botton right corner
    if (nrow + 1 < rows && ncol + 1 < cols) {
        if (currGen[nrow + 1][ncol + 1] == 1)   //check bottom right neighbor
            count++;
    }    
    
    return count;
}

function createNextGen() {
    
    for (row in currGen) {
        for (col in currGen[row]) {
           
            let neighbors = getNeighborCount(row, col);
         
            // If Alive
            if (currGen[row][col] == 1) {
              
                if (neighbors < 2) {
                    nextGen[row][col] = 0;  //the cell dies because she is sad
                    updatePopulation(-1);
                }
                else if (neighbors == 2 || neighbors == 3) {
                    nextGen[row][col] = 1;  //the cell lives on! yay!
                }
                else if (neighbors > 3) {   
                    nextGen[row][col] = 0;  //the cell dies due to "overcrowding"
                    updatePopulation(-1);
                }
            }
            else if (currGen[row][col] == 0) {
                // If not already occupied
                if (neighbors == 3) {
                    nextGen[row][col] = 1;  //a new cell is born! HYPERS!
                    updatePopulation(+1);
                }
            }
        }
    }
}

function updateCurrGen() {
    
    // use the results of the last createNextGen() call
    for (row in currGen) {
        for (col in currGen[row]) {

            currGen[row][col] = nextGen[row][col];
            nextGen[row][col] = 0;
        }
    }
}
