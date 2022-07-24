$( document ).ready( function () {
	let submitBtn = document.getElementById("submitBtn");
	let clear = document.getElementById("clear");
	let clearLast = document.getElementById("clearLast");
	let currentInput = document.getElementById("currentInput");
	let valuesArray = [];
	let numbers = document.querySelectorAll(".number");

	for (var i = 0; i < numbers.length; i++) {
		let current = numbers[i]

		numbers[i].addEventListener("click", function () {
			let value = document.getElementById(current.value).value;
			let input = document.getElementById("input");

			if (!(input.value.slice(-1) === '/' && value === '0' || value === '.' && input.value.slice(-1) === '.' || value === '.' && currentInput.value.indexOf('.') > -1)) {

				input.value = input.value + value;

				if (currentInput.value === '0') {
					currentInput.value = value;
				} else if (currentInput.value !== '/' && currentInput.value !== '*' && currentInput.value !== '+' && currentInput.value !== '-') {
					currentInput.value = currentInput.value + value;
				} else {
					valuesArray.push(currentInput.value);
					currentInput.value = value;
				}
			}
		});

	}

	let operators = document.querySelectorAll(".operator");

	for (var i = 0; i < operators.length; i++) {
		let current = operators[i]
		operators[i].addEventListener("click", function () {
			let value = document.getElementById(current.value).value;
			let input = document.getElementById("input");
			if (input.value.slice(-1) !== '/' && input.value.slice(-1) !== '*' && input.value.slice(-1) !== '+' && input.value.slice(-1) !== '-' && input.value !== "") {
				valuesArray.push(currentInput.value);
				input.value = input.value + value;
				currentInput.value = value;
			}
		});
	}

	submitBtn.addEventListener("click", calculate);
	clear.addEventListener("click", clearValue);
	clearLast.addEventListener("click", clearLastValue);

	function calculate() {

		let input = document.getElementById("input");
		let currentInput = document.getElementById("currentInput");

		if (input.value.slice(-1) !== '/' && input.value.slice(-1) !== '*' && input.value.slice(-1) !== '+' && input.value.slice(-1) !== '-') {

			if (eval(input.value) !== undefined) {
				input.value = eval(input.value);
				currentInput.value = eval(input.value);
			}

		}

		valuesArray = [];

	}

	function clearValue() {
		let input = document.getElementById("input");
		let currentInput = document.getElementById("currentInput");
		input.value = "";
		currentInput.value = "";
		valuesArray = [];
		currentInput.value = "0";
	}

	function clearLastValue() {
		let input = document.getElementById("input");
		let value = input.value;
		let currentValue = currentInput.value;
		let numString = "";

		if (currentValue === "0") {
			if (input.value !== "") {
				let inputEnd = input.value.substr(-1, 1);
				if (inputEnd === "*" || inputEnd === "/" || inputEnd === "+" || inputEnd === "-") {
					input.value = input.value.slice(0, -1);
					for (var i = -1; i >= -input.value.length; i--) {
						let char = input.value.substr(i, 1);
						if (char === "*" || char === "/" || char === "+" || char === "-") { break; }
						numString = numString + char;
					}
					input.value = input.value.slice(0, -numString.length);
				}
			}
		}
		else if (currentValue !== "*" && currentValue !== "/" && currentValue !== "+" && currentValue !== "-") {
			let re = new RegExp(currentValue + "$");
			input.value = input.value.replace(re, "")
		} else {
			input.value = input.value.slice(0, -1);
			for (var i = -1; i >= -input.value.length; i--) {
				let char = input.value.substr(i, 1);
				if (char === "*" || char === "/" || char === "+" || char === "-") { break; }
				numString = numString + char;
			}
			input.value = input.value.slice(0, -numString.length);
		}

		currentInput.value = "0";
	}
} );	