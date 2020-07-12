const userInput = document.getElementById("user-input");
const convertBtn = document.querySelector("button");
const resultView = document.getElementById("result");
const inputField = document.getElementById("input-field");
const outputField = document.getElementById("output-field");
const switchBtn = document.getElementById("checkbox");
const introText = document.querySelector("h3");
const text = document.getElementById("text");

const INTRO_DEC_TO_BI =
	"This app converts Decimal numbers into its equivalent Binary digits. Enter a number into the blank field and press Convert to view the result.";
const INTRO_BI_TO_DEC = `This app converts Binary digits into its equivalent Decimal number.
Enter 0 or 1 into the blank field and press Convert to view the
result.`;

const BINARY_TEXT = "Binary digits:";
const DECIMAL_TEXT = "Decimal value:";

let biArr = []; // Array holds binary digits
let isSwitchOn = false;

switchBtn.addEventListener("change", switchHandler);

function modeSelect(mode) {
	resultView.value = "";
	userInput.value = "";
	if (mode === BINARY_TEXT) {
		introText.textContent = INTRO_BI_TO_DEC;
		inputField.textContent = BINARY_TEXT;
		outputField.textContent = DECIMAL_TEXT;
	} else if (mode === DECIMAL_TEXT) {
		introText.textContent = INTRO_DEC_TO_BI;
		outputField.textContent = BINARY_TEXT;
		inputField.textContent = DECIMAL_TEXT;
	}
}

function switchHandler() {
	userInput.focus();
	// Decimal to binary
	if (!isSwitchOn) {
		userInput.style.background = "white";
		isSwitchOn = true;
		modeSelect(DECIMAL_TEXT);
		return;
	}
	// Binary to decimal
	if (isSwitchOn) {
		userInput.style.background = "white";
		isSwitchOn = false;
		modeSelect(BINARY_TEXT);
		return;
	}
}

function inputHandler() {
	let userInputValue = userInput.value.trim(); // Remove any white space
	// Mode of bi to dec when the switch is unchecked
	if (!switchBtn.checked) {
		for (let i = 0; i < userInputValue.length; i++) {
			if (userInputValue[i] != 0 && userInputValue[i] != 1) {
				userInput.style.background = "rgb(255,186,186)";
				alert("Please enter 0 or 1. Try again!");
				return;
			}
		}
		userInput.style.background = "white";
		return 0;
	} else {
		// Mode of dec to bi when the switch is checked
		if (isNaN(userInputValue)) {
			userInput.style.background = "rgb(255,186,186)";
			alert("You should enter only numbers. Please try again!");
			return;
		}
		userInput.style.background = "white";
		return 0;
	}
}

function convertBinaryToDecimal() {
	let userInputValue = userInput.value;
	let exponent = userInputValue.length - 1;
	let calculation = 0;
	for (let i = 0; i < userInputValue.length; i++) {
		calculation += userInputValue[i] * Math.pow(2, exponent);
		exponent--;
	}
	return calculation;
}

function convertDecimalToBinary() {
	biArr = []; // reset the array
	let integer = userInput.value;
	let answer = Math.floor(integer / 2);
	let remainder = integer % 2;
	biArr.push(remainder);
	while (answer > 0) {
		remainder = answer % 2;
		answer = Math.floor(answer / 2);
		biArr.push(remainder);
	}
	return biArr.reverse().join("");
}

function displayHandler(result) {
	resultView.value = result;
	userInput.focus();
}

function run() {
	let check = inputHandler();
	let result;
	if (check === 0 && !switchBtn.checked) {
		result = convertBinaryToDecimal();
		displayHandler(result);
	} else if (check === 0 && switchBtn.checked) {
		result = convertDecimalToBinary();
		displayHandler(result);
	}
}

// running function
function init() {
	userInput.focus();
	userInput.addEventListener("keyup", function (e) {
		resultView.value = "";
		if (e.keyCode === 13) {
			run();
		} else if (e.keyCode === 13) {
			run();
		}
	});

	convertBtn.addEventListener("click", run);
}
