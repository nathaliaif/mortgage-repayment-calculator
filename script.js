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

const loader = document.querySelector('.loader');

function clearErrorMessage(){
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

// ---- Clear button clicked ----
clearBtn.addEventListener('click', () => {
    clearErrorMessage();
    inputMortgageAmount = '';
    inputMortgageTerm = '';
    inputInterestRate = '';
    document.getElementById('repayment').checked = true;
    completedResultsContainer.setAttribute('style', 'display: none');
    emptyResultsContainer.setAttribute('style', 'display: block');
})



calculateBtn.addEventListener('click', () => {
    completedResultsContainer.setAttribute('style', 'display: none');
    clearErrorMessage();

    // ---- Calculating mortgage totals start ----
    const inputMortgageType = document.querySelector('input[name="type"]:checked');
    let mortgageType = inputMortgageType.value;

    let amount = inputMortgageAmount.value;
    let term = inputMortgageTerm.value;
    let rate = inputInterestRate.value / 100;
    let n = 12;
    let interest = amount / term / n;
    
    let monthlyPayment = ((amount * (rate / n)) / (1 - Math.pow(1 + (rate / n), -n * term)));
    let totalPay = (monthlyPayment * term * n);
    let monthlyInterestPayment = monthlyPayment - interest;
    let totalInterestPayment = monthlyInterestPayment * term * n; 
    // ---- Calculating mortgage totals end ----

    // ---- Checking if all inputs have value ----
    let inputs = [inputMortgageAmount, inputInterestRate, inputMortgageTerm];
    let emptyInput = inputs.filter(item => item.value <= 0 || item.value == '');

    if (emptyInput.length != 0){
        emptyInput.forEach(item => {
            const errorMessage = document.querySelector(`.message__${item.id}`);
            const inputBackground = document.querySelector(`.input-${item.id}`);
            const inputIcon = document.querySelector(`.icon-${item.id}`);
            emptyResultsContainer.setAttribute('style', 'display: block');
            
            item.value <= 0 && item.value != '' ?  
                errorMessage.innerText = `Value can't be lower than 0`
                : errorMessage.innerText = 'This field is required';

            inputBackground.setAttribute('style', 'background-color: var(--error); border: 1px solid var(--error)');
            inputIcon.setAttribute('style', 'color: #fff;');
        })
    } else {
        clearErrorMessage();

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
    }
});
