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
const inputAll = document.querySelectorAll('input[type="number"');

const loader = document.querySelector('.loader');

// ---- Remove error messages ----
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

// ---- Error message on blur ----
inputAll.forEach(item => {
    item.addEventListener('blur', (event) => {
        const value = event.target.value;

    if (value <= 0){
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
    } else {
        clearErrorMessage();
    }
            
    })
})

calculateBtn.addEventListener('click', () => {
    completedResultsContainer.setAttribute('style', 'display: none');
    // clearErrorMessage();

    // ---- Calculating mortgage totals start ----
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
    // ---- Calculating mortgage totals end ----


    // ---- Checking if all inputs have value ----
    const inputs = [inputMortgageAmount, inputInterestRate, inputMortgageTerm];
    const emptyInput = inputs.filter(item => item.value <= 0 || item.value == '');

    // If the inputs have valid values:
    if (emptyInput.length === 0){
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

    // if (emptyInput.length != 0){
    //     emptyInput.forEach(item => {
    //         const errorMessage = document.querySelector(`.message__${item.id}`);
    //         const inputBackground = document.querySelector(`.input-${item.id}`);
    //         const inputIcon = document.querySelector(`.icon-${item.id}`);
    //         emptyResultsContainer.setAttribute('style', 'display: block');
            
    //         item.value <= 0 && item.value != '' ?  
    //             errorMessage.innerText = `Value must be greater than 0`
    //             : errorMessage.innerText = 'This field is required';

    //         inputBackground.setAttribute('style', 'background-color: var(--error); border: 1px solid var(--error)');
    //         inputIcon.setAttribute('style', 'color: #fff;');
    //     })
    // } else {
    //     clearErrorMessage();

    //     function changeResultsTexts(main, secondary){
    //         monthlyRepaymentText.innerText = `$${parseFloat(main).toFixed(2)}`;
    //         totalRepaymentText.innerText = `$${parseFloat(secondary).toFixed(2)}`;
    //     }
    
    //     switch(mortgageType){
    //         case 'repayment':
    //             changeResultsTexts(monthlyPayment, totalPay);
    //             break;
    //             case 'interest-only':
    //                 changeResultsTexts(monthlyInterestPayment, totalInterestPayment);
    //             break;
    //         default:
    //             break;
    //         }
        
    //     emptyResultsContainer.setAttribute('style', 'display: none');
    //     loader.setAttribute('style', 'display: block');
        
    //     setTimeout(() => {
    //         loader.setAttribute('style', 'display: none');
    //         completedResultsContainer.setAttribute('style', 'display: block');
    //     },500)
    // }
});
