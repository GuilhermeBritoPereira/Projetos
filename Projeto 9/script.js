// --- Seleciona os elementos do HTML ---
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

// --- Variáveis de Estado ---
let currentInput = '0';
let operator = null;
let previousInput = '';
let isWaitingForSecondNumber = false;

// --- Adiciona o "Ouvinte" de Eventos para todos os botões ---
buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleButtonClick(button.innerText);
    });
});

// --- Função "Distribuidora" Principal ---
function handleButtonClick(value) {
    if (!isNaN(value) || value === '.') {
        handleNumberAndDecimal(value);
    } else {
        handleSymbol(value);
    }
    updateDisplay();
}

// --- Função para Tratar Números e Ponto Decimal ---
function handleNumberAndDecimal(value) {
    if (isWaitingForSecondNumber) {
        currentInput = value;
        isWaitingForSecondNumber = false;
    } else {
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            if (value === '.' && currentInput.includes('.')) {
                return;
            }
            currentInput += value;
        }
    }
}

// --- Função para Tratar Símbolos e Operadores (MODIFICADA) ---
function handleSymbol(value) {
    switch (value) {
        case 'AC':
            resetCalculator();
            break;
        case 'DEL':
            deleteLastCharacter();
            break;
        case '%': // <<< CASO ESPECIAL PARA PORCENTAGEM
            handlePercent();
            break;
        case '=':
            handleEquals();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(value);
            break;
    }
}

// --- Funções Auxiliares de Lógica ---
function resetCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    isWaitingForSecondNumber = false;
}

function deleteLastCharacter() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
}

// >>>>>>>> NOVA FUNÇÃO PARA TRATAR A PORCENTAGEM <<<<<<<<<<
function handlePercent() {
    // Se não houver um número anterior, a porcentagem não faz sentido
    if (previousInput === '') {
        return;
    }
    // Converte o valor atual na porcentagem correspondente do valor anterior
    const percentageValue = (parseFloat(previousInput) * parseFloat(currentInput)) / 100;
    currentInput = String(percentageValue);
}

function handleOperator(nextOperator) {
    if (isWaitingForSecondNumber) {
        operator = nextOperator;
        return;
    }
    if (operator !== null && previousInput !== '') {
        calculate();
    }
    previousInput = currentInput;
    operator = nextOperator;
    isWaitingForSecondNumber = true;
}

function handleEquals() {
    if (operator === null || previousInput === '' || isWaitingForSecondNumber) {
        return;
    }
    calculate();
    operator = null;
    previousInput = '';
    isWaitingForSecondNumber = false;
}

// --- A Mágica da Matemática (MODIFICADA) ---
function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                result = "Erro";
            } else {
                result = prev / current;
            }
            break;
        // O caso de '%' foi removido daqui, pois agora tem sua própria função
    }
    currentInput = String(result);
}

// --- Função para Atualizar o Visor ---
function updateDisplay() {
    display.innerText = currentInput;
}