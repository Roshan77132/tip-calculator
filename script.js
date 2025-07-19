// Inputs
const billInput = document.getElementById('bill');
const tipButtons = document.querySelectorAll('.tip-btn');
const customTipInput = document.getElementById('custom-tip');
const peopleInput = document.getElementById('num-people');
const tipAmountDisplay = document.getElementById('tip-amount-display');
const resetButton = document.getElementById('reset-btn');

let selectedTip = 0;

// Tip button handler
tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        tipButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        customTipInput.value = '';
        selectedTip = parseFloat(button.getAttribute('data-tip'));

        calculateTip();
    });
});

// Custom tip input handler
customTipInput.addEventListener('input', () => {
    tipButtons.forEach(btn => btn.classList.remove('active'));

    selectedTip = parseFloat(customTipInput.value) || 0;
    calculateTip();
});

// Bill and people input handler
[billInput, peopleInput].forEach(input => {
    input.addEventListener('input', calculateTip);
});

// Reset
resetButton.addEventListener('click', () => {
    billInput.value = '';
    customTipInput.value = '';
    peopleInput.value = '';
    selectedTip = 0;
    tipAmountDisplay.textContent = 'NPR 0.00';
    tipButtons.forEach(btn => btn.classList.remove('active'));
});

// Main calculate function
function calculateTip() {
    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value);

    if (isNaN(bill) || bill <= 0 || isNaN(people) || people <= 0 || isNaN(selectedTip)) {
        tipAmountDisplay.textContent = 'NPR 0.00';
        return;
    }

    const totalTip = (bill * selectedTip) / 100;
    const tipPerPerson = totalTip / people;

    tipAmountDisplay.textContent = `NPR ${tipPerPerson.toFixed(2)}`;
}
