'use strict';

// selecionamos todo o conteúdo que será usado;

// display é a div que contém a "tela" da calculadora;
const display   = document.getElementById('display');
// key são as teclas numéricas;
const numbers   = document.querySelectorAll('[id*=key]');
// operator são as teclas de operação;
const operators = document.querySelectorAll('[id*=operator]');

// criamos as variáveis;
let newNumber = true;
let operator;
let previewNumber;

// função para atualizar o display quando um newNumber for selecionado
const updateDisplay = (text) => {
    if (newNumber){
        display.textContent = text.toLocaleString('BR');
        newNumber = false;
    }else {
        display.textContent += text;
    }
}

const pedingOperator = () => operator !== undefined;

const calculate = () => {
    // se o operador não for igual a indefinido...
    if (pedingOperator()) {
        // replace vai achar a virgula e trocar para ponto que é reconhecido no JS
        const currentNumber = parseFloat(display.textContent.replace(',', '.'));
        newNumber = true;

        const result = eval (`${previewNumber}${operator}${currentNumber}`);
        updateDisplay(result);
        // if (operator == '+') {
        //     updateDisplay(previewNumber + currentNumber)
        // }else if (operator == '-') {
        //     updateDisplay(previewNumber - currentNumber)
        // }else if (operator == '*') {
        //     updateDisplay(previewNumber * currentNumber)
        // }else if (operator == '/') {
        //     updateDisplay(previewNumber / currentNumber)
        // }
    }
}

const insertNumber = (event) => updateDisplay(event.target.textContent);
numbers.forEach(number => number.addEventListener('click', insertNumber));

const selectOperator = (event) => {
    if (!newNumber) {
        calculate();
        newNumber = true;
        operator = event.target.textContent;
        previewNumber = parseFloat(display.textContent.replace(',', '.'));
    }
}

operators.forEach(operator => operator.addEventListener('click', selectOperator));

const activateEqual = () => {
    calculate();
    // para nao gerar novo operador depois do igual
    operator = undefined;
}

document.getElementById('equal').addEventListener('click', activateEqual);

const clearDisplay = () => display.textContent = ''
document.getElementById('clearDisplay').addEventListener('click', clearDisplay);

const clearCalculation = () => {
    clearDisplay();
    operator = undefined;
    newNumber = true;
    previewNumber = undefined;
}
document.getElementById('clearCalculation').addEventListener('click', clearCalculation);

const removeLastNumber = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removeLastNumber);

const reverse = () => {
    newNumber = true;
    updateDisplay(display.textContent * -1);

}
document.getElementById('reverse').addEventListener('click', reverse);

// O método indexOf() retorna o primeiro índice em que o elemento pode ser encontrado no array,
// retorna -1 caso o mesmo não esteja presente
// serve para nao haver repetição de virgula
const existDecimal = () => display.textContent.indexOf(',') !== -1;
const existValue = () => display.textContent.length > 0;

const decimal = () => {
    if (!existDecimal()) {
        if (existValue()) {
            updateDisplay(',');
        }else {
            updateDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', decimal);

const mapKeyboard = {
    '0'         : 'key0',
    '1'         : 'key1',
    '2'         : 'key2',
    '3'         : 'key3',
    '4'         : 'key4',
    '5'         : 'key5',
    '6'         : 'key6',
    '7'         : 'key7',
    '8'         : 'key8',
    '9'         : 'key9',
    '='         : 'equal',
    'Enter'     : 'equal',
    '+'         : 'operatorSum',
    '-'         : 'operatorSubtract',
    '*'         : 'operatorMultiply',
    '/'         : 'operatorDivide',
    'c'         : 'clearDisplay',
    'Escape'    : 'clearCalculation',
    ','         : 'decimal',
    'Backspace' : 'backspace'
}

const mappingKeyboard = (event) => {
    const key = event.key;

    const keyOn = () => Object.keys(mapKeyboard).indexOf(key) !== -1
    if (keyOn()) document.getElementById(mapKeyboard[key]).click();
}

document.addEventListener('keydown', mappingKeyboard);
