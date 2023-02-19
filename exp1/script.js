
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
    let matrix = [];
    // let rows = prompt("Enter the number of rows in the matrix:");
    // let columns = prompt("Enter the number of columns in the matrix:");

    for (let i = 0; i < matrix.length; i++) {
        let row = [];
        for (let j = 0; j < matrix[i].length; j++) {
            let element = parseFloat(document.getElementById("cell" + i + "_" + j).value);
            row.push(parseFloat(element));
        }
        matrix.push(row);
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
	var html = "";
	var det = getDeterminant(matrix);

	if(det===0){
		// Get the augmented matrix
	var augMatrix = augmentMatrix(matrix);
	// Get the rank of the matrix
	var rank = getRank(matrix);

	var rows = matrix.length;
	var columns = matrix[0].length;

	console.log(rows, columns);

	
	
	if(rank==rows){
		html = "<p>Unique Solution</p>";

		
	}else if(rank< columns-1){
		html = "<p>Infinite Solutions</p>";
		document.getElementById("result").innerHTML = html;

	}else{
		html = "<p>No Solution</p>";
		document.getElementById("result").innerHTML = html;


	}
	
	html += "<p>Rank: " + rank + "</p>";
	html += "<p>Determinant: " + det + "</p>";
	document.getElementById("result").innerHTML = html;



	}else{
		html = "<p>Unique Solution</p>";
		document.getElementById("result").innerHTML = html;



	}


	

	
	

	// // Check the solution type
	// var solutionType = getSolutionType(augMatrix, rank, matrix[0].length);

	// // Find the solution
	// var solution = findSolution(augMatrix, rank, matrix[0].length);

	// Display the result
	}

function augmentMatrix(matrix) {
	let augmentedMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        let row = matrix[i].slice();
        for (let j = matrix[i].length; j <= matrix[i].length; j++) {
            row.push(0);
        }
        augmentedMatrix.push(row);
        
        
        console.log('Augmented Matrix'+augmentedMatrix);
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

