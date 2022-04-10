const btn = document.querySelector(".btn-submit");
const formData = document.querySelectorAll(".form input");

// fields
let firstName = document.querySelector(".first-name");
let lastName = document.querySelector(".last-name");
let address = document.querySelector(".address");
let city = document.querySelector(".city");
let province = document.querySelector(".province");
let postal = document.querySelector(".postal");
let phone = document.querySelector(".phone");
let email = document.querySelector(".email");
let users = document.querySelector(".users");
let day1 = document.querySelector(".day1");
let day2 = document.querySelector(".day2");
let newData = {};

// regex
const postalCodePattern = /^\A\d\A ?\d\A\d$/;
const emailPattern = /[^@]+@[^\.]+\..+/;
const phonePattern = /^(\d{3}-|\(\d{3}\))\d{3}-\d{4}$/;

// errors
let isInvalid = false;
const errorMessageTop = document.querySelector(".error-message-top");
const errorMessages = document.querySelectorAll(".error-message");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  isInvalid = false;
  clearErrorMessages();  

  if (firstName.value == "") {
    console.log(firstName.value);
    isInvalid = true;
    errorMessages[0].innerHTML = "first name required";
  }

  if (lastName.value == "") {
    console.log(lastName.value);
    isInvalid = true;
    errorMessages[1].innerHTML = "last name required";
  }

  if (address.value == "") {
    console.log(address.value);
    isInvalid = true;
    errorMessages[2].innerHTML = "address required";
  }

  if (city.value == "") {
    console.log(city.value);
    isInvalid = true;
    errorMessages[3].innerHTML = "city required";
  }

  if (province.value == "") {
    console.log(province.value);
    isInvalid = true;
    errorMessages[4].innerHTML = "province required";
  }

  // postal regex
  if (!postalCodePattern.test(postal.value)) {
    console.log(postal.value);
    isInvalid = true;
    errorMessages[5].innerHTML = "postal wrong format";
  }

  if (postal.value == "") {
    console.log(postal.value);
    isInvalid = true;
    errorMessages[5].innerHTML = "postal required";
  }

  // phone regex
  if (!phonePattern.test(phone.value)) {
    console.log(phone.value);
    isInvalid = true;
    errorMessages[6].innerHTML = "phone wrong format";
  }

  if (phone.value == "") {
    console.log(phone.value);
    isInvalid = true;
    errorMessages[6].innerHTML = "phone required";
  }

  // email regex
  if (!emailPattern.test(email.value)) {
    console.log(email.value);
    isInvalid = true;
    errorMessages[7].innerHTML = "email wrong format";
  }

  if (email.value == "") {
    console.log(email.value);
    isInvalid = true;
    errorMessages[7].innerHTML = "email required";
  }

  if (users.value == "") {
    console.log(users.value);
    isInvalid = true;
    errorMessages[8].innerHTML = "#users required";
  }

  if (!day1.checked && !day2.checked) {
    console.log(day1.checked);
    console.log(day2.checked);
    isInvalid = true;
    errorMessages[9].innerHTML = "#days required";
  }

  if (isInvalid) {
    errorMessageTop.innerHTML = "invalid";
  } else {
    createData();
    localStorage.setItem("tempData", JSON.stringify(newData));    
    //test
    let result = JSON.parse(localStorage.getItem("tempData"))
    console.log(result.day1)
    console.log(result.day2)
    console.log(result.price)
    //test
    // window.location.href = "../pages/summary.html";
  }
});

function createData() {
  newData = Array.from(formData).reduce(
    (acc, input) => ({ ...acc, [input.id]: input.value }),
    {}
  );
    
  newData.price = calculatePrice();
  console.log(newData);
}

function clearErrorMessages() {
  errorMessageTop.innerHTML = "";
  errorMessages.forEach((m) => {
    m.innerHTML = "";
  });
}

function calculatePrice() {
    let price = 0

    if (day1.checked && day2.checked) {
        price = 800
    } else if (day1.checked) {
        price = 375
    } else if (day2.checked) {
        price = 475
    }

    console.log(+users.value)
    price = price * +users.value

    if (+users.value > 5) {
        price = price * 0.95
    }        
    return price;
}
