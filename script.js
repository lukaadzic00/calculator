function handleNumberInput(e) {
    if(!num1Finished) {
        number1 = makeNumber(e, number1);
        showToDisplay(number1);
        console.log("num1: " + number1);
    } else if(!num2Finished) {
        number2 = makeNumber(e, number2);
        showToDisplay(number2);
        console.log("num2: " + number2);
        console.log("operation: " + operation);
    }
}

function makeNumber(e, num) {
    let current;
    if(e.type === 'click') {
        current = e.target.textContent;
    } else if(e.type === 'keydown') {
        current = e.key;
    }
    
    if(num !== '0') {
        num = num + current;
    } else {
        num = current;
    }
    return num;
}

function handlePoint() {
    if(!num1Finished) {
        if(!number1.includes('.') && number1 !== '') {
            number1 = number1 + '.';
            showToDisplay(number1);
        }
    } else if(!num2Finished) {
        if(!number2.includes('.') && number2 !== '') {
            number2 = number2 + '.';
            showToDisplay(number2);
        }
    }
}

function makeOperation(e) {
    if(operation !== '') {
        number1 = calculate(number1, number2, operation);
        showToDisplay(number1);
        number2 = '';
        num2Finished = false;
    }
    
    if(e.type === 'click') {
        operation = e.target.textContent;
    } else if(e.type === 'keydown') {
        operation = e.key;
    }
    
    num1Finished = true;
    if(number1 === '') {
        number1 = '0';
    }
}

function handleBackspace() {
    if(!num1Finished) {
        number1 = backspace(number1);
        console.log("num1: " + number1);
        showToDisplay(number1);

        if(number1 === 0) {
            number1 = '';
        }
    } else if(!num2Finished) {
        number2 = backspace(number2);
        console.log("num1: " + number2);
        showToDisplay(number2);

        if(number2 === 0) {
            number2 = '';
        }
    }
}

function backspace(num) {
    if(num !== '' && num !== 0) {
        num = num.slice(0, -1);
    }

    if(num === '') {
        num = 0;
    }
    return num;
}

function calculate(num1, num2, op) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result;

    if(op === '+') {
        result = +(num1 + num2).toFixed(7);
    } else if(op === '-') {
        result = +(num1 - num2).toFixed(7);
    } else if(op === '*') {
        result = +(num1 * num2).toFixed(7);
    } else if(op === '/') {
        if(num2 === 0) {
            alert("You can't divide by zero!");
            return 0;
        }
        result = +(num1 / num2).toFixed(7);
    }
    return result;
}

function handleEqualButton() {
    let result = calculate(number1, number2, operation);    
    showToDisplay(result);

    number1 = result.toString();
    [number2, operation] = ['', ''];
    [num1Finished, num2Finished] = [false, false];
}

function clearAll() {
    [number1, number2, operation] = ['', '', ''];
    [num1Finished, num2Finished] = [false, false];
    showToDisplay(0);
}

function showToDisplay(num) {
    display.textContent = num;
}


let operation = '';
let number1 = '';
let number2 = '';
let num1Finished = false;
let num2Finished = false;

const clear = document.querySelector('#clear');
const del = document.querySelector('#backspace');
const numbers = document.querySelectorAll('.number');
const point = document.querySelector('#point');
const operations = document.querySelectorAll('.operation');
const equal = document.querySelector('#equal');

clear.addEventListener('click', (e) => clearAll());

del.addEventListener('click', (e) => handleBackspace());

for(const number of numbers) {
    number.addEventListener('click', handleNumberInput);
}

point.addEventListener('click', (e) => handlePoint());

for(const op of operations) {
    op.addEventListener('click', (e) => {makeOperation(e);});
}

equal.addEventListener('click', (e) => handleEqualButton());

// KEYBOARD EVENT //
document.addEventListener('keydown', (e) => {
    let key = e.key;
    
    if(key >= '0' && key <= '9') {
        handleNumberInput(e);
    } else if(key === '.') {
        handlePoint();
    } else if(['+', '-', '*', '/'].includes(key)) {
        makeOperation(e);
    } else if(key === 'Enter') {
        handleEqualButton();
    } else if(key == 'Backspace') {
        handleBackspace();
    }
});