// Values
const inputMortgageAmount = document.getElementById('mortgage-amount');
const inputMortgageTerm = document.getElementById('mortgage-term');
const inputInterestRate = document.getElementById('interest-rate');
const mortgageTypeLabel = document.querySelectorAll('.mortgage__type');

// Buttons
const calculateBtn = document.querySelector('.calculate-button');
const clearBtn = document.querySelector('.mortgage-container__clear');

// Elements
const emptyResultsContainer = document.querySelector('.empty-results');
const completedResultsContainer = document.querySelector('.completed-results');
const monthlyRepaymentText = document.querySelector('.results__monthly-repayment');
const totalRepaymentText = document.querySelector('.results__total-repayment');

const errorMessageAll = document.querySelectorAll('.required-message');
const inputBackgroundAll = document.querySelectorAll('.input-label');
const inputIconAll = document.querySelectorAll('.input__icon');
const inputNumberAll = document.querySelectorAll('input[type="number"');

const loader = document.querySelector('.loader');

// Remove all error messages
function clearErrorMessageAll(){
    errorMessageAll.forEach(item => {
        item.innerText = '';
    })

    inputBackgroundAll.forEach(item => {
        item.style.backgroundColor = '';
        item.style.border = '';
    })

    inputIconAll.forEach(item => {
        item.style.color = '';
    })
}

function showErrorMessage(item, value) {
    const errorMessage = document.querySelector(`.message__${item.id}`);
    const inputBackground = document.querySelector(`.input-${item.id}`);
    const inputIcon = document.querySelector(`.icon-${item.id}`);
    emptyResultsContainer.setAttribute('style', 'display: block');
    completedResultsContainer.setAttribute('style', 'display: none');

    value <= 0 && value != '' ?  
        errorMessage.innerText = `Value must be greater than 0`
        : errorMessage.innerText = 'This field is required';

    inputBackground.setAttribute('style', 'background-color: var(--error); border: 1px solid var(--error)');
    inputIcon.setAttribute('style', 'color: #fff;');
}

// Clear inputs when button clicked
clearBtn.addEventListener('click', () => {
    clearErrorMessageAll();
    inputMortgageAmount = '';
    inputMortgageTerm = '';
    inputInterestRate = '';
    document.getElementById('repayment').checked = true;
    completedResultsContainer.setAttribute('style', 'display: none');
    emptyResultsContainer.setAttribute('style', 'display: block');
})

//Preventing input number from accepting specific chars
var invalidChars = [
    "-",
    "+",
    "e",
  ];
  
inputNumberAll.forEach(item => {
    item.addEventListener("keydown", function(e) {
        if (invalidChars.includes(e.key)) {
          e.preventDefault();
        }
      });
})

// Error message on blur
inputNumberAll.forEach(item => {
    item.addEventListener('blur', (event) => {
        const value = event.target.value;

    if (value <= 0 || value == ''){
        showErrorMessage(item, value);
    } else {
        const errorMessage = document.querySelector(`.message__${item.id}`);
        const inputBackground = document.querySelector(`.input-${item.id}`);
        const inputIcon = document.querySelector(`.icon-${item.id}`);

        errorMessage.innerText = '';
        inputBackground.style.backgroundColor = '';
        inputBackground.style.border = '';
        inputIcon.style.color = '';
    }
    })
})

calculateBtn.addEventListener('click', () => {
    completedResultsContainer.setAttribute('style', 'display: none');

    // Calculating all mortgage totals
    const inputMortgageType = document.querySelector('input[name="type"]:checked');
    const mortgageType = inputMortgageType.value;

    const amount = inputMortgageAmount.value;
    const term = inputMortgageTerm.value;
    const rate = inputInterestRate.value / 100;
    const n = 12;
    const interest = amount / term / n;
    
    const monthlyPayment = ((amount * (rate / n)) / (1 - Math.pow(1 + (rate / n), -n * term)));
    const totalPay = (monthlyPayment * term * n);
    const monthlyInterestPayment = monthlyPayment - interest;
    const totalInterestPayment = monthlyInterestPayment * term * n; 
    
    //Checking if the inputs have valid values
    const inputs = [inputMortgageAmount, inputInterestRate, inputMortgageTerm];
    const emptyInput = inputs.filter(item => item.value <= 0 || item.value == '');

    // If the inputs values are valid:
    if (emptyInput.length === 0){
        clearErrorMessageAll();

        function changeResultsTexts(main, secondary){
            monthlyRepaymentText.innerText = `$${parseFloat(main).toFixed(2)}`;
            totalRepaymentText.innerText = `$${parseFloat(secondary).toFixed(2)}`;
        }
    
        switch(mortgageType){
            case 'repayment':
                changeResultsTexts(monthlyPayment, totalPay);
                break;
            case 'interest-only':
                changeResultsTexts(monthlyInterestPayment, totalInterestPayment);
                break;
            default:
                break;
            }
        
        emptyResultsContainer.setAttribute('style', 'display: none');
        loader.setAttribute('style', 'display: block');
        
        setTimeout(() => {
            loader.setAttribute('style', 'display: none');
            completedResultsContainer.setAttribute('style', 'display: block');
        },500)
    } else { 
        //If input never had focus and was empty
        emptyInput.forEach(item => {
            if (item.value === '') {
                showErrorMessage(item, item.value);
            }
        })
    }
});
