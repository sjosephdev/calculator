
// ---- VARIABLES/CONSTANTS ----
  // -- BUTTONS --
  const numBtn = document.querySelectorAll('.numButton');
  const btn = document.querySelectorAll('.Button');
  const btnDecimal = document.querySelector('#decimal');
  const btnEquals = document.querySelector('#equals');
  const btnSubtract = document.querySelector('#subtract');
  const btnAdd = document.querySelector('#add');
  const btnMultiply = document.querySelector('#multiply');
  const btnDivide = document.querySelector('#divide');
  const btnClear = document.querySelector('#clear');
  const btnDel = document.querySelector('#delete');
  const btnCopy = document.querySelector('#copy');
  const runningEquation = document.querySelector('#equation');
  const input = document.querySelector('input');
  const calButton = Array.from(document.querySelectorAll('.calButton'));

// ---- CALCULATOR OBJ ----
const cal = {

  operand1: '',
  operand2: '',
  currentOperator: '',
  accumulator: 0,
  equationHistory: [],
  op1HeldValue: false,
  pressedEquals: false,
  operation: '',

	operators: {
		add: function(operand1, operand2) { return parseFloat(operand1) + parseFloat(operand2) },
		subtract: function(operand1, operand2) { return parseFloat(operand1) - parseFloat(operand2) },
		multiply: function(operand1, operand2) { return parseFloat(operand1) * parseFloat(operand2) },
		divide: function(operand1, operand2) { return parseFloat(operand1) / parseFloat(operand2) },
	},

	evaluate: function() {
    event.target.classList.add('clicking');
    if (cal.accumulator) {
      switch (cal.currentOperator) {
        case 'add':
          cal.accumulator = cal.operators.add(cal.accumulator, cal.operand2)
          cal.operand1 = '';
          cal.operand2 = '';
          break;
        case 'subtract':
          cal.accumulator = cal.operators.subtract(cal.accumulator, cal.operand2)
          cal.operand1 = '';
          cal.operand2 = '';
          break;
        case 'multiply':
          cal.accumulator = cal.operators.multiply(cal.accumulator, cal.operand2)
          cal.operand1 = '';
          cal.operand2 = '';
          break;
        case 'divide':
          cal.accumulator = cal.operators.divide(cal.accumulator, cal.operand2)
          cal.operand1 = '';
          cal.operand2 = '';
          break;
        case 'equals':
          break;
       }
    } else {
  		switch (cal.currentOperator) {
    		case 'add':
    			cal.accumulator = cal.operators.add(cal.operand1, cal.operand2)
          cal.operand1 = '';
          cal.operand2 = '';
    			break;
    		case 'subtract':
          cal.accumulator = cal.operators.subtract(cal.operand1, cal.operand2)
          cal.operand1 = '';
          cal.operand2 = '';
    			break;
    		case 'multiply':
    			cal.accumulator = cal.operators.multiply(cal.operand1, cal.operand2)
          cal.operand1 = '';
          cal.operand2 = '';
    			break;
    		case 'divide':
          cal.accumulator = cal.operators.divide(cal.operand1, cal.operand2)
          cal.operand1 = '';
          cal.operand2 = '';
    			break;
	  }
    }
    if (cal.pressedEquals) {
      input.value = cal.accumulator;
      cal.pressedEquals = false;
      runningEquation.innerText = '';
      cal.equationHistory = [];
      cal.op1HeldValue = false;
    }

	},

  // ---- METHODS ----
  clickNumber: function() {
    event.target.classList.add('clicking')
    if (cal.op1HeldValue || cal.accumulator) {
      cal.operand2 += event.target.value;
      input.value = cal.operand2;
      runningEquation.innerText = `${cal.equationHistory.join('')} ${cal.operand2}`;1
    } else {
      cal.operand1 += event.target.value;
      input.value = cal.operand1;
      runningEquation.innerText = cal.operand1;
    }
  },

  enterNumber: function(e) {
    const keyPress = document.querySelector(`.numButton[data-key='${e.keyCode}']`);
    keyPress.classList.add('clicking');
    if (cal.op1HeldValue) {
      cal.operand2 += keyPress.innerHTML
      input.value = cal.operand2
    } else {
      cal.operand1 += keyPress.innerHTML
      input.value = cal.operand1
    }
  },

  clickDelete: function() {
    event.target.classList.add('clicking');
    if (cal.op1HeldValue) {
      cal.operand2 = cal.operand2.slice(0, -1)
      runningEquation.innerText = cal.operand2
      input.value = cal.operand2
    } else {
      cal.operand1 = cal.operand1.slice(0, -1)
      runningEquation.innerText = cal.operand1
      input.value = cal.operand1
    }
  },

  clickClear: function() {
    event.target.classList.add('clicking');
    cal.operand1 = '';
    cal.operand2 = '';
    cal.currentOperator = '';
    cal.op1HeldValue = false;
    cal.accumulator = 0;
    runningEquation.innerText = '';
    cal.equationHistory = [];
    input.value = 0;
  },

  clickCopy: function() {
    event.target.classList.add('clicking');
    input.select();
    document.execCommand("copy");
  },

  add: function() {
    event.target.classList.add('clicking');
    cal.equationHistory.push(`${input.value} + `)
    runningEquation.innerText = `${cal.equationHistory.join('')}`
    if (cal.op1HeldValue) {
      cal.evaluate()
    } else {
      cal.op1HeldValue = true;
    }
    cal.currentOperator = 'add';
  },

  subtract: function() {
    event.target.classList.add('clicking');
    cal.equationHistory.push(`${input.value} - `)
    runningEquation.innerText = `${cal.equationHistory.join('')}`
    if (cal.op1HeldValue) {
      cal.evaluate()
    } else {
      cal.op1HeldValue = true;
    }
    cal.currentOperator = 'subtract';
  },

  multiply: function() {
    event.target.classList.add('clicking');
    cal.equationHistory.push(`${input.value} * `)
    runningEquation.innerText = `${cal.equationHistory.join('')}`
    if (cal.op1HeldValue) {
      cal.evaluate()
    } else {
      cal.op1HeldValue = true;
    }
    cal.currentOperator = 'multiply';
  },

  divide: function() {
    event.target.classList.add('clicking');
    cal.equationHistory.push(`${input.value} / `)
    runningEquation.innerText = `${cal.equationHistory.join('')}`
    if (cal.op1HeldValue) {
      cal.evaluate();
    } else {
      cal.op1HeldValue = true;
    }
    cal.currentOperator = 'divide';
  },

  equalPress: function() {
    cal.pressedEquals = true;
    cal.evaluate();
  },


  stopTransition: function(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('clicking');
  },

}

  // ---- EVENT LISTENERS ----
    // -- CLICK EVENTS --

    //clicks on a number button:
  numBtn.forEach(numBtn => numBtn.addEventListener('click', cal.clickNumber));
    //evaluates current total when user clicks on a non-number button:
  btn.forEach(btn => btn.addEventListener('click', cal.evaluate));
    //evaluates total when user clicks on equals button:
  btnEquals.addEventListener('click', () => {
    cal.equalPress();
  });
    //clears input and stored data when user clicks on clear button:
  btnClear.addEventListener('click', cal.clickClear);
    //deletes last number
  btnDel.addEventListener('click', cal.clickDelete);
    //copys input:
  btnCopy.addEventListener('click', cal.clickCopy);
    //adds values:
  btnAdd.addEventListener('click', cal.add);
    //subtacts values:
  btnSubtract.addEventListener('click', cal.subtract);
    //multiply values:
  btnMultiply.addEventListener('click', cal.multiply);
    //divide values:
  btnDivide.addEventListener('click', cal.divide);
    //button transitions:
  calButton.forEach(button => button.addEventListener('transitionend', cal.stopTransition));
    //allows user to enter numbers using number pad:
  window.addEventListener('keydown', cal.enterNumber);
