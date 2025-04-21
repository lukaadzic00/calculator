function makeNumber(e, number) {
    let num = parseInt(e.target.textContent)
    number = number * counter + num;
    const display = document.querySelector('#display');
    display.textContent = number;
}

function defineOperation(e) {
    let operation = e.target.textContent;
}

let operation = '';
let number1 = 0;
let number2 = 0;
let counter = 10;


const numbers = document.querySelectorAll('.number');
for(const number of numbers) {
    number.addEventListener('click', (e) => {
        if(!operation) {
            makeNumber(e, number1);
        } else {
            makeNumber(e, number2);
        }
    });
}

const operations = document.querySelectorAll('.operation');
for(const operation of operations) {
    operation.addEventListener('click', defineOperation);
}