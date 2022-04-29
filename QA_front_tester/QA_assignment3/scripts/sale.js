const btn = document.querySelector(".btn");
let formData = document.querySelectorAll(".form input");

// form fields
let firstName = document.querySelector("#first-name");
let lastName = document.querySelector("#last-name");
let address = document.querySelector("#address");
let city = document.querySelector("#city");
let province = document.querySelector("#province");
let postal = document.querySelector("#postal");
let phone = document.querySelector("#phone");
let email = document.querySelector("#email");
let make = document.querySelector("#make");
let model = document.querySelector("#model");
let year = document.querySelector("#year");
let newData = {};

//regular expressions
const postalCodePattern = /^\d\A\d ?\A\d\A$/;
const emailPattern = /[^@]+@[^\.]+\..+/;
const yearPattern = /^\d{4}$/;
const phonePattern = /^(\d{3}-|\(\d{3}\))\d{3}-\d{4}$/;

// errors
let isInvalid = false;
const errorMessage = document.querySelector(".error-message");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  removeErrorStyles();
  isInvalid = false;

  if (firstName.value == "") {
    console.log(firstName.value);
    isInvalid = true;
    firstName.classList.add("showError");
  }

  if (lastName.value == "") {
    console.log(lastName.value);
    isInvalid = true;
    lastName.classList.add("showError");
  }

  if (address.value == "") {
    console.log(address.value);
    isInvalid = true;
    address.classList.add("showError");
  }

  if (city.value == "") {
    console.log(city.value);
    isInvalid = true;
    city.classList.add("showError");
  }

  if (province.value == "") {
    console.log(province.value);
    isInvalid = true;
    province.classList.add("showError");
  }

  if (postal.value == "") {
    console.log(postal.value);
    isInvalid = true;
    postal.classList.add("showError");
  }

  // postal regex
  if (!postalCodePattern.test(postal.value)) {
    console.log(postal.value);
    isInvalid = true;
    postal.classList.add("showError");
  }

  if (phone.value == "") {
    console.log(phone.value);
    isInvalid = true;
    phone.classList.add("showError");
  }

  // phone regex
  if (!phonePattern.test(phone.value)) {
    console.log(phone.value);
    isInvalid = true;
    phone.classList.add("showError");
  }

  if (email.value == "") {
    console.log(email.value);
    isInvalid = true;
    email.classList.add("showError");
  }

  // email regex
  if (!emailPattern.test(email.value)) {
    console.log(email.value);
    isInvalid = true;
    email.classList.add("showError");
  }

  if (make.value == "") {
    console.log(make.value);
    isInvalid = true;
    make.classList.add("showError");
  }

  if (model.value == "") {
    console.log(model.value);
    isInvalid = true;
    model.classList.add("showError");
  }

  if (year.value == "") {
    console.log(year.value);
    isInvalid = true;
    year.classList.add("showError");
  }

  // year regex
  if (!yearPattern.test(year.value)) {
    console.log(year.value);
    isInvalid = true;
    year.classList.add("showError");
  }

  if (isInvalid) {
    errorMessage.classList.add("show");
  } else {
    createData();
    localStorage.setItem("tempData", JSON.stringify(newData));
    console.log(JSON.parse(localStorage.getItem("tempData")));
    window.location.href = "../pages/summary.html";
    // window.location.href = "C:/Users/jin/Documents/GitHub/practice_javascript/QA_assignment3/pages/summary.html";
  }
});

function removeErrorStyles() {
  formData.forEach((i) => {
    i.classList.remove("showError");
  });
}

function createData() {
  newData = Array.from(formData).reduce(
    (acc, input) => ({ ...acc, [input.id]: input.value }),
    {}
  );

  console.log(newData);
}
