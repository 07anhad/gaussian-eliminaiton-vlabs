
var matrix = [];

function createMatrix() {
	// Get the number of rows and columns

	var btn = document.getElementById("btnSolve");
	btn.removeAttribute('hidden');
	document.getElementById("result").innerHTML = '';



	var rows = document.getElementById("rows").value;
	var cols = document.getElementById("cols").value;

	// Create the matrix
	var html = "";
	for (var i = 0; i < rows; i++) {
		matrix[i] = [];
		html += "<div style= 'padding: 4px'> <lable  style= 'padding: 4px'> Row: "+i+  "</lable>";
		for (var j = 0; j < cols; j++) {
			matrix[i][j] = 0;
			html += "<input style= 'padding: 4px' type='number' id='cell" + i + "_" + j + "'>  ";
		}
		html += "</div>";
	}



	document.getElementById("matrix").innerHTML = html;

}

function getMatrix() {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let element = parseFloat(document.getElementById("cell" + i + "_" + j).value);
            matrix[i][j] = parseFloat(element);
        }
    }

    return matrix;
}






function solve() {
    // Get the matrix values from the input fields
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = parseFloat(document.getElementById("cell" + i + "_" + j).value);
        }
    }

    // Get the determinant of the matrix
    var det = getDeterminant(matrix);

    var html = "";
    if (det !== 0) {
        // The system has a unique solution
        var numVars = matrix[0].length - 1;
        var varNames = "";
        for (var i = 0; i < numVars; i++) {
            varNames += "x" + (i + 1);
            if (i < numVars - 1) {
                varNames += ", ";
            }
        }
        var values = [];
        for (var i = 0; i < numVars; i++) {
            values.push(getDeterminant(getSubMatrix(matrix, 0, i)) / det);
        }
        html = "<p>" + varNames + " = " + values.join(", ") + "</p>";
    } else {
        // The system has either no solution or infinite solutions
        var augMatrix = augmentMatrix(matrix);
        var rank = getRank(matrix);
        if (rank < matrix[0].length - 1) {
            html = "<p>Infinite solutions</p>";
        } else {
            html = "<p>No solution</p>";
        }
    }

    // Display the result
    html += "<p>Determinant: " + det + "</p>";
    document.getElementById("result").innerHTML = html;
}



    function augmentMatrix(matrix) {
        let augmentedMatrix = [];
        for (let i = 0; i < matrix.length; i++) {
            let row = matrix[i].slice();
            for (let j = matrix[i].length; j < 2 * matrix[i].length; j++) {
                if (j === i + matrix[i].length) {
                    row.push(1);
                } else {
                    row.push(0);
                }
            }
            augmentedMatrix.push(row);
        }
        return augmentedMatrix;
    }
    

function getRank(matrix) {
    let rank = 0;
    let rows = matrix.length;
    let columns = matrix[0].length;
    for (let i = 0; i < rows; i++) {
        let pivot = -1;
        for (let j = 0; j < columns; j++) {
            if (matrix[i][j] !== 0) {
                pivot = j;
                break;
            }
        }
        if (pivot === -1) {
            continue;
        }
        rank++;
        for (let k = i + 1; k < rows; k++) {
            let factor = matrix[k][pivot] / matrix[i][pivot];
            for (let l = pivot; l <= columns; l++) {
                matrix[k][l] = matrix[k][l] - factor * matrix[i][l];
            }
        }
    }
    return rank;
}



function getDeterminant(matrix) {
	if(matrix.length === 1) return matrix[0][0];
    if(matrix.length === 2) return matrix[0][0]*matrix[1][1] - matrix[0][1]*matrix[1][0];
    let determinant = 0;
    for(let i = 0; i < matrix[0].length; i++){
        determinant += Math.pow(-1, i) * matrix[0][i] * getDeterminant(getSubMatrix(matrix, 0, i));
    }
    
    
    console.log('Determinant '+determinant);
    
    return determinant;
}


function getSubMatrix(matrix, row, col) {
    let submatrix = [];
    for(let i = 0; i < matrix.length; i++) {
        if(i === row) continue;
        let subRow = [];
        for(let j = 0; j < matrix[0].length; j++) {
            if(j === col) continue;
            subRow.push(matrix[i][j]);
        }
        submatrix.push(subRow);
    }
    return submatrix;
}


