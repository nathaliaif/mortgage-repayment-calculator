const inputMortgageAmount = document.getElementById('mortgage-amount');
const inputMortgageTerm = document.getElementById('mortgage-term');
const inputInterestRate = document.getElementById('interest-rate');

const calculateBtn = document.querySelector('.calculate-button');
const clearBtn = document.querySelector('.mortgage-container__clear');
const mortgageTypeLabel = document.querySelectorAll('.mortgage__type');

const emptyResultsContainer = document.querySelector('.empty-results');
const completedResultsContainer = document.querySelector('.completed-results');
const monthlyRepaymentText = document.querySelector('.results__monthly-repayment');
const totalRepaymentText = document.querySelector('.results__total-repayment');


clearBtn.addEventListener('click', () => {
    inputMortgageAmount = '';
    inputMortgageTerm = '';
    inputInterestRate = '';
    document.getElementById('repayment').checked = true;
    completedResultsContainer.setAttribute('style', 'display:none');
    emptyResultsContainer.setAttribute('style', 'display:block');
})


calculateBtn.addEventListener('click', () => {
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

    function changeResultsTexts(main, secondary){
        monthlyRepaymentText.innerText = `R$${parseFloat(main).toFixed(2)}`;
        totalRepaymentText.innerText = `R$${parseFloat(secondary).toFixed(2)}`;
    }

    switch(mortgageType){
        case 'repayment':
            changeResultsTexts(monthlyPayment, totalPay);
            console.log('repayment')
            break;
            case 'interest-only':
                changeResultsTexts(monthlyInterestPayment, totalInterestPayment);
                console.log('interest')
            break;
        default:
            break;
        }
    

    emptyResultsContainer.setAttribute('style', 'display:none');
    setTimeout(() => {
        completedResultsContainer.setAttribute('style', 'display:block');
    },500)
});
