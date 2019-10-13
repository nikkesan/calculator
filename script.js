// Object to hold data needed to calculate output - uses immediate execution logic
const calculator = {
  displayValue: '0',
  firstVar: null,
  operator: null,
  secondVar: null
};

// Function to update display value of calculator
function updateDisplay() {
  const display = document.querySelector('.current-display');
  display.value = calculator.displayValue;
}
updateDisplay();

/* Main key press handler for listening for button presses
   Button click states are either:
   1. Digits (0-9)
   2. Operators (+, -, *, /, =)
   3. Decimal point (.)
   4. Reset (AC)
   5. On-Off switch (ON/OFF)  
*/
const keys = document.querySelector('.calculator');
keys.addEventListener('click', (event) => {
  const target = event.target;
  // If a click was NOT on a calculator button, then exit function. 
  if (!target.matches('button')) {
    return;
  }
  if (target.classList.contains('operator')) {
    console.log('operator', target.value);
    return;
  }
  if (target.classList.contains('decimal')) {
    console.log('decimal', target.value);
    return;
  }
  if (target.classList.contains('all-clear')) {
    console.log('clear', target.value);
    return;
  }
  if (target.classList.contains('on-off')) {
    console.log('on-off', target.value);
    return;
  }
  console.log('digit', target.value);
});
