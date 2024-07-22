const inputMortgageAmount = document.getElementById('mortgage-amount');
const inputMortgageTerm = document.getElementById('mortgage-term');
const inputInterestRate = document.getElementById('interest-rate');
const inputMortgageType = document.querySelector('input[name="type"]:checked');

const calculateBtn = document.querySelector('.calculate-button');
const clearBtn = document.querySelector('.mortgage-container__clear');

clearBtn.addEventListener('click', () => {
    inputMortgageAmount = '';
    inputMortgageTerm = '';
    inputInterestRate = '';
    document.getElementById('repayment').checked = true;
})

calculateBtn.addEventListener('click', () => {
    console.log(inputMortgageType.value);
});
