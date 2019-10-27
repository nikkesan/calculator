// Object to hold data needed to calculate output - uses immediate execution logic
const calculator = {
  displayValue: '0',
  varA: null,
  operator: null,
  varB: null,
  readyForVarB: false
};

// Function to update display value of calculator
function updateDisplay() {
  const display = document.querySelector('.current-display');
  display.value = calculator.displayValue;
}
updateDisplay();

// Clear all calculator settings 
function resetCalculator() {
  calculator.displayValue = '0';
  calculator.varA = null;
  calculator.operator = null;
  calculator.readyForVarB = false;
}

/* Main key press handler for listening to button presses
   Button click states are either:
   1. Digits (0-9)
   2. Operators (+ - * / =)
   3. Decimal point (.)
   4. Reset (AC)
*/
const keys = document.querySelector('.calculator');
keys.addEventListener('click', (event) => {
  const target = event.target;
  // If a click was NOT on a calculator button, then exit function. 
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains('all-clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }
  inputDigit(target.value);
  updateDisplay();
});

/* Overwrite initial display '0' with number input if a number is pressed.  
   Append digits if additional numbers are pressed */
function inputDigit(digit) {
  const displayValue = calculator.displayValue;
  const readyForVarB = calculator.readyForVarB;

  if (readyForVarB === true) {
    calculator.displayValue = digit;
    calculator.readyForVarB = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

/* Add a decimal point to the display value if there isn't already a decimal point present. 
   Only ONE decimal point allowed */
function inputDecimal(decimal) {
  if (calculator.waitingForSecondOperand === true) {
    return;
  }
  if (!calculator.displayValue.includes(decimal)) {
    calculator.displayValue += decimal;
  }
}

function handleOperator(nextOperator) {
  const varA = calculator.varA;
  const displayValue = calculator.displayValue;
  const operator = calculator.operator;
  const inputValue = parseFloat(displayValue); // Convert input into a number with decimals


  if (operator && calculator.readyForVarB) {
    calculator.operator = nextOperator;
    return;
  }
  // Store converted number into varA if no value exists yet
  if (varA === null) {
    calculator.varA = inputValue;
  } else if (operator) {
    const currentValue = varA || 0;
    const result = performCalculation[operator](currentValue, inputValue);

    calculator.displayValue = String(result);
    calculator.varA = result;
  }

  calculator.readyForVarB = true;
  calculator.operator = nextOperator;
}

const performCalculation = {
  '+': (varA, readyForVarB) => varA + readyForVarB,
  '-': (varA, readyForVarB) => varA - readyForVarB,
  '*': (varA, readyForVarB) => varA * readyForVarB,
  '/': (varA, readyForVarB) => varA / readyForVarB,
  '=': (varA, readyForVarB) => readyForVarB,
};