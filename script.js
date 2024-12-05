const display = document.getElementById('display');
let lastResult = false;

function appendNumber(num) {
    if (lastResult) {
        display.value = '';
        lastResult = false;
    }
    display.value += num;
}

function appendOperator(operator) {
    if (display.value === 'i love you') {
        display.value = '';
    }
    if (display.value !== '' && !isOperator(display.value.slice(-1))) {
        display.value += operator;
        lastResult = false;
    }
}

function isOperator(char) {
    return ['+', '-', '*', '/', '%'].includes(char);
}

function clearDisplay() {
    display.value = '';
    lastResult = false;
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value;
        
        // Khusus untuk pengecekan 143
        if (expression.includes('+')) {
            let numbers = expression.split('+');
            let sum = numbers.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
            if (sum === 143) {
                display.value = "i love you🌷🩷";
                lastResult = true;
                return;
            }
        }

        // Kalkulasi normal
        let result = eval(expression);
        
        // Format hasil desimal
        if (Number.isFinite(result)) {
            if (Number.isInteger(result)) {
                display.value = result;
            } else {
                display.value = result.toFixed(2);
            }
        } else {
            display.value = 'Error';
        }
        
        lastResult = true;
    } catch (error) {
        display.value = 'Error';
        lastResult = true;
    }
}

// Menambahkan keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9' || event.key === '.') {
        appendNumber(event.key);
    } else if (['+', '-', '*', '/', '%'].includes(event.key)) {
        appendOperator(event.key);
    } else if (event.key === 'Enter') {
        calculate();
    } else if (event.key === 'Backspace') {
        backspace();
    } else if (event.key === 'Escape') {
        clearDisplay();
    }
});
