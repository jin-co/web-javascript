/* patterns */
var pattern1 = /^[A-Z]{2}\d{6}$/;
var pattern2 = /^[a-z]$/;
var pattern3 = /^$/;

/* variables for form */
var formContainer = document.getElementById("main");
var form = document.querySelector("form"); 
var label = document.getElementsByClassName("label");
var input = document.getElementsByClassName("input");
var errorMessage = document.getElementById("error-message");

/* title */
var title = document.getElementsByTagName("h1");

/* variables for result */
var resultContainer = document.getElementById("result");
var resultMessage = document.getElementsByClassName("result-message")

form.addEventListener("submit", submitForm);

function submitForm(e) {
    errorMessage.textContent = "";
    e.preventDefault();
    validateRequired(label[0], input[0]);
    validateRequired(label[1], input[1]);
    validateRequired(label[2], input[2]);
    validateRequired(label[3], input[3]);
    validateRequired(label[5], input[5]);

    validatePattern(label[1], input[1]);

    validateNumber(label[3], input[3]);
    validateNumber(label[4], input[4]);
    validateNumber(label[5], input[5]);
    if (errorMessage.textContent == "")
    {
        showResult();
    }
};

// validate if required field is empty
// if it is empty add an error message
function validateRequired(label, input) {
    if(input.value == '')
    {
        errorMessage.innerHTML += label.textContent + " Required<br/>";
    }
};

// validate the pattern
// if the input value does not match the given pattern add an error message
function validatePattern(label, input) {
    if (!input.value == '')
    {
        if (!pattern1.test(input.value)) {
            errorMessage.innerHTML += label.textContent + " Pattern Missmatch<br/>";
        }
    }
};

// validate number
// if it is not a number add an error message
function validateNumber(label, input) {
    if (!input.value == '') {
        if (isNaN(input.value)) {
            errorMessage.innerHTML += label.textContent + " Please Enter Number<br/>";
        }
    }
}

// hide the orginal form
// add the input into the result form
// show the result
function showResult() {
    formContainer.classList.add("hide");
    title[0].textContent = "Result";
    resultContainer.classList.remove("hide");
    resultMessage[0].innerHTML = input[0].value;
    resultMessage[1].innerHTML = input[1].value;
    resultMessage[2].innerHTML = input[2].value;
    
    var totalCommission;
    var totalSale = (parseFloat(input[3].value) + parseFloat(input[4].value)).toFixed(2);
    
    if (totalSale < 10000){
        totalCommission = (totalSale * 0.1).toFixed(2);
    }

    else if (totalSale < 20000) {
        totalCommission = (totalSale * 0.15).toFixed(2);
    }

    else {
        totalCommission = (totalSale * 0.2).toFixed(2);
    }
    var pending = (totalCommission - parseFloat(input[5].value)).toFixed(2);

    resultMessage[3].innerHTML = totalSale;
    resultMessage[4].innerHTML = totalCommission;

    resultMessage[5].innerHTML = input[5].value;
    resultMessage[6].innerHTML = pending;



};

