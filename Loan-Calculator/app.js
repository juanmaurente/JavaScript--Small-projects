
//---------------------------- start of first version without UX ----------------------
/*
        ---------------------------------------------------------------------------------------
        |we were calling the function calculateResults right away. Now the idea is to delay it |
        |to show the processing icon so that the user knows something is happening             |
        ----------------------------------------------------------------------------------------

// Listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

function calculateResults(e){

        //UI Variables
        const amount = document.getElementById('amount');
        const interest = document.getElementById('interest');
        const years = document.getElementById('years');
        const monthlyPayment = document.getElementById('monthly-payment');
        const totalPayment = document.getElementById('total-payment');
        const totalInterest = document.getElementById('total-interest');
        
        const principal = parseFloat(amount.value); //as we want it as a decimal
        const calculatedInterest = parseFloat(interest.value) / 100 / 12;
        const calculatedPayments = parseFloat(years.value) * 12;

        //Compute monthly payments
        const x = Math.pow( 1 + calculatedInterest, calculatedPayments);
        const monthly = (principal * x * calculatedInterest) / (x-1);

        if (isFinite(monthly)){
            monthlyPayment.value = monthly.toFixed(2);
            totalPayment.value = (monthly * calculatedPayments).toFixed(2);
            totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        } else {
            showError('Please check your numbers');
        }
e.preventDefault();
}
*/
//---------------------------- end of first version without UX ----------------------

// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide results
    document.getElementById('results').style.display = 'none';
    
    // Show loader
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 2000)

    
    
    e.preventDefault();
});

function calculateResults(){

        //UI Variables
        const amount = document.getElementById('amount');
        const interest = document.getElementById('interest');
        const years = document.getElementById('years');
        const monthlyPayment = document.getElementById('monthly-payment');
        const totalPayment = document.getElementById('total-payment');
        const totalInterest = document.getElementById('total-interest');
        
        const principal = parseFloat(amount.value); //as we want it as a decimal
        const calculatedInterest = parseFloat(interest.value) / 100 / 12;
        const calculatedPayments = parseFloat(years.value) * 12;

        //Compute monthly payments
        const x = Math.pow( 1 + calculatedInterest, calculatedPayments);
        const monthly = (principal * x * calculatedInterest) / (x-1);

        if (isFinite(monthly)){
            monthlyPayment.value = monthly.toFixed(2);
            totalPayment.value = (monthly * calculatedPayments).toFixed(2);
            totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
            
            // Show results and hide spiner
            document.getElementById('results').style.display = 'block';
            document.getElementById('loading').style.display = 'none';
        } else {
            showError('Please check your numbers');
        }
}
//Show Error
function showError(error){
    
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';


    //Create a Div with class alert, create a text node and append it to div
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    //Get elements to insert it into the dom. card is the parent div and as we want it to put above the heading we select it, too.
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    card.insertBefore(errorDiv, heading);

    //clear error after 10 seconds
    setTimeout(clearError, 10000);
}

function clearError(){
    document.querySelector('.alert').remove();
}