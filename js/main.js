
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
  accEquation: '',
  op1HeldValue: false,


  // ---- METHODS ----
  clickNumber: function() {
    event.target.classList.add('clicking')
    if (cal.op1HeldValue) {
      cal.operand2 += event.target.value
      input.value = cal.operand2
      runningEquation.innerHTML += cal.operand2
      cal.evaluate();
    } else {
      cal.operand1 += event.target.value
      input.value = cal.operand1
      runningEquation.innerHTML += cal.operand1
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
      runningEquation.innerHTML = cal.operand2.slice(0, -1)
      input.value = cal.operand2
    } else {
      cal.operand1 = cal.operand1.slice(0, -1)
      runningEquation.innerHTML = cal.operand1.slice(0, -1)
      input.value = cal.operand1
    }
  },

  clickClear: function() {
    event.target.classList.add('clicking');
    cal.operand1 = '';
    cal.operand2 = '';
    cal.currentOperator = '';
    cal.op1HeldValue = false;
    runningEquation.innerHTML = '';
    input.value = 0;
  },

  clickCopy: function() {
    event.target.classList.add('clicking');
    input.select();
    document.execCommand("copy");
  },

  evaluate: function() {
    event.target.classList.add('clicking');
    if (cal.op1HeldValue && cal.operand2) {
      Number(cal.operand2);
      switch(cal.currentOperator) {
        case 'add':
          cal.operand1 = Number(cal.operand1) + Number(cal.operand2);
          input.value = cal.operand1;
          cal.operand2 = '';
          break;
        case 'subtract':
          cal.operand1 = Number(cal.operand1) - Number(cal.operand2);
          input.value = cal.operand1;
          cal.operand2 = '';
          break;
        case 'multiply':
          cal.operand1 = Number(cal.operand1) * Number(cal.operand2);
          input.value = cal.operand1;
          cal.operand2 = '';
          break;
        case 'divide':
          cal.operand1 = Number(cal.operand1) / Number(cal.operand2);
          input.value = cal.operand1;
          cal.operand2 = '';
          break;
      }
    }
  },

  add: function() {
    event.target.classList.add('clicking');
    cal.currentOperator = 'add';
    runningEquation.innerHTML = `${runningEquation.innerHTML} + `
    if (cal.op1HeldValue) {
      cal.evaluate()
    } else {
      cal.op1HeldValue = true;
      Number(cal.operand1);
    }
  },

  subtract: function() {
    event.target.classList.add('clicking');
    cal.currentOperator = 'subtract';
    runningEquation.innerHTML = `${runningEquation.innerHTML} - `
    if (cal.op1HeldValue) {
      cal.evaluate()
    } else {
      cal.op1HeldValue = true;
      Number(cal.operand1);
    }
  },

  multiply: function() {
    event.target.classList.add('clicking');
    cal.currentOperator = 'multiply';
    runningEquation.innerHTML = `${runningEquation.innerHTML} x `
    if (cal.op1HeldValue) {
      cal.evaluate()
    } else {
      cal.op1HeldValue = true;
      Number(cal.operand1);
    }
  },

  divide: function() {
    event.target.classList.add('clicking');
    cal.currentOperator = 'divide';
    runningEquation.innerHTML = `${runningEquation.innerHTML} / `
    if (cal.op1HeldValue) {
      cal.evaluate()
    } else {
      cal.op1HeldValue = true;
      Number(cal.operand1);
    }
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
  btnEquals.addEventListener('click', cal.evaluate);
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
