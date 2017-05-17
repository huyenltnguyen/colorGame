var numberOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".mode");

init();

function init() {	
	setupModeBtns();
	setupSquares();
	reset();
}

function setupModeBtns() {
	// click listener for mode buttons
	for (var i = 0; i < modeBtns.length; i++) {
		modeBtns[i].addEventListener("click", function() {
			// remove the selected class from both buttons
			// then add the class to the clicked button
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			this.classList.add("selected");
			// if this.textContent === "Easy" then numberOfSquares = 3, otherwise numberOfSquares = 6
			this.textContent === "Easy" ? numberOfSquares = 3: numberOfSquares = 6;

			reset();
		});
	}
}

function setupSquares() {
	for (var i = 0; i < squares.length; i++) {
		// add click listeners to squares
		squares[i].addEventListener("click", function() {
			// grab color of clicked square
			// this line of code HAS TO BE backgroundColor !!!
			var clickedColor = this.style.backgroundColor;
			// compare color to pickedColor
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				changeSquarsColors(pickedColor);
				h1.style.backgroundColor = pickedColor;
				resetBtn.textContent = "Play Again?";
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try again!";
			}
		});
	}
}

// add click listener to reset button
resetBtn.addEventListener("click", function() {
	reset();
});

function reset() {
	// generate all new colors
	colors = generateRandomColors(numberOfSquares);	
	// pick a new random color from array
	pickedColor = pickColor();
	// change colorDisplay to match new picked color
	colorDisplay.textContent = pickedColor;
	// change colors of squares
	for (var i = 0; i < squares.length; i++) {
		// if the Easy button is clicked, the colors array has only 3 items, while here we're looping through 6 squares. We check if there is a color that matches that square (index-wise) then these squares will have background color, which is for the first 3 squares. The last 3 squares don't have the associate color so they will be hiden
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}				
	}
	// set h1 background back to the original
	h1.style.backgroundColor = "steelblue";
	// reset messageDisplay
	messageDisplay.textContent = "";
	// change Play Again? to New Colors when user clicks on the button
	resetBtn.textContent = "New Colors";	
}

function changeSquarsColors (color) {
	// loop through all squares
	for  (var i = 0; i < squares.length; i++) {
		squares[i].style.background = color;
	}
	// change each color to the match given color
}

// pick a random color from the color array
function pickColor () {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	// make an array
	var arr = [];
	// repeat num times
	for (var i = 0; i < num; i++) {
		// get random colors and push into arr
		arr.push(randomColor());
	}
	
	return arr;
}

function randomColor() {
	// pick a "red" from 0-255
	var r = Math.floor(Math.random() * 256);
	// pick a "green" from 0-255
	var g = Math.floor(Math.random() * 256);
	// pick a "blue" from 0-255
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}