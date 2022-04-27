var patternPhone = /^((\d{3}[/. -]){2}\d{4})$/;
var patternPostal = /^[A-Z]\d[A-Z] ?[A-Z]\d[A-Z]$/;
var patternEmail = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

/* variables to check if error occured (1:invalid / 0: valid) */
var isThereError = true;
var errorControl = [1,1,1,1,1,1,1];

$("form").on("submit", (e) => {

    e.preventDefault();
    for(i = 0; i <= errorControl.length-1; i++)
    {
        if(errorControl[i] == 1)
        {
            isThereError = true;
            break;
        }
        else
        {
            isThereError = false;
        }
    }  
    if(!isThereError)  
    {
        placeOrder();
        $("#submit-button").attr({
            "value":"Next"
        });
    }
});

$("form").on("input", function()
{
    validateRequired("name", 0);
    validateRequired("address", 1);
    validateRequired("city", 2);
    validatePattern("email", 3);
    validatePattern("phone", 4);
    validatePattern("post-code", 5);
    validateProducts(6);
});

// check if required fields are missing
// show valid or invalid message accordingly
function validateRequired(fieldName, fieldIndex)
{
    if($("#"+fieldName).val() == null || $("#"+fieldName).val() === '')
    {
        showInvalid(fieldName, fieldIndex);
    }
    else
    {
        showValid(fieldName, fieldIndex);
    }
}

// decide which field is
// validate the input with the field pattern
// show valid or invalid message accordingly
function validatePattern(fieldName, fieldIndex)
{
    var pattern;
    switch(fieldName)
    {
        case "email":
            pattern = patternEmail;
            break;
        case "phone":
            pattern = patternPhone;
            break;
        case "post-code":
            pattern = patternPostal;
            break;
    }
    if($("#"+fieldName).val() == null || $("#"+fieldName).val() === '')
    {
        showInvalid(fieldName, fieldIndex);
    }
    else
    {
        if(!pattern.test($("#" + fieldName).val()))
        {
            showInvalid(fieldName, fieldIndex);
        }
        else
        {
            showValid(fieldName, fieldIndex);
        }
    }
}

// check if no product is chosen, show error if so
// check if the inputs are numbers
// show valid or invalid message accordingly
function validateProducts(fieldIndex)
{
    var firstProduct = parseInt($("#product1").val());
    var secondProduct = parseInt($("#product2").val());
    var thirdProduct = parseInt($("#product3").val());
    if(Number.isNaN(firstProduct) && Number.isNaN(secondProduct) &&
    Number.isNaN(thirdProduct))
    {
        showInvalid("product", fieldIndex);
    }
    else
    {
        showValid("product", fieldIndex);
    }
}

// hide valid messages and effects
// show invalid messages and effects
function showInvalid(fieldName, fieldIndex) 
{
    $("#"+fieldName).addClass("invalid");
    $("#error-message-"+fieldName).addClass("visible");
    $("#invalid-"+ fieldName + "-icon").addClass("visible");
    $("#"+fieldName).removeClass("valid");
    $("#valid-" + fieldName + "-icon").removeClass("visible");
    errorControl[fieldIndex] = 1;
}

// hide invalid messages and effects
// show valid messages and effects
function showValid(fieldName, fieldIndex)
{
    $("#"+fieldName).removeClass("invalid");
    $("#error-message-"+fieldName).removeClass("visible");
    $("#invalid-"+ fieldName + "-icon").removeClass("visible");
    $("#"+fieldName).addClass("valid");
    $("#valid-"+ fieldName + "-icon").addClass("visible");
    errorControl[fieldIndex] = 0;
}

function placeOrder()
{
    $("#submit-button").on("click", function()
    {
        $("#main-form").fadeOut();
        $("#invoice").removeClass("hide");
        $("#result-name").text($("#name").val());
        $("#result-email").text($("#email").val());
        $("#result-phone").text($("#phone").val());
        $("#result-delivery-address").text($("#address").val() +
        ",\n" + $("#city").val() + ",\n" + $("#province").val() +
        ", " + $("#post-code").val());

        $("#quantity1").text($("#product1").val());
        $("#quantity2").text($("#product2").val());
        $("#quantity3").text($("#product3").val());

        var productPrice1 = parseInt($("#unit-price1").html() * $("#quantity1").html());
        var productPrice2 = parseInt($("#unit-price2").html() * $("#quantity2").html());
        var productPrice3 = parseInt($("#unit-price3").html() * $("#quantity3").html());

        $("#result-product1").text(productPrice1.toFixed(2));
        $("#result-product2").text(productPrice2.toFixed(2));
        $("#result-product3").text(productPrice3.toFixed(2));

        var shippingCharge = getDeliveryCharge($("#delivery").val());
        $("#result-shipping-charges").text(shippingCharge.toFixed(2));

        var subTotal = productPrice1 + productPrice2 + productPrice3 + shippingCharge;

        $("#result-sub-total").text(subTotal.toFixed(2));

        var provincialTax = getProvincialTax($("#province").val());
        var taxes = ((provincialTax / 100) * subTotal);
        $("#provincial-tax").text(provincialTax);
        $("#result-taxes").text(taxes.toFixed(2));
        
        $("#result-total").text((subTotal + taxes).toFixed(2));
    });
}

// return delivery price based on the day chosen
function getDeliveryCharge(deliveryChoice)
    {
        switch(deliveryChoice)
        {
            case "1day":
                return 40;
   
            case "2day":
                return 30;
   
            case "3day":
                return 20;
   
            case "4day":
                return 10;
        }
    }

// return provincial tax based on the province chosen
function getProvincialTax(province)
{
    switch(province)
    {
        case "alberta":
            return provinceTax = 14;
        case "british columbia":
            return provinceTax = 13;
        case "manitoba":
            return provinceTax = 12;
        case "new brunswick":
            return provinceTax = 11;
        case "newfoundland and labrador":
            return provinceTax = 11;
        case "nova scotia":
            return provinceTax = 13;
        case "ontario":
            return provinceTax = 12;
        case "prince edward island":
            return provinceTax = 14;
        case "quebec":
            return provinceTax = 12;
        case "saskatchewan":
            return provinceTax = 16;
        case "yukon":
            return provinceTax = 11;
    }
}